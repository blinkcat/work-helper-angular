import { Animate } from './animate';
import { Subject } from 'rxjs';

export interface ScrollerMove {
  scrollX: number;
  scrollY: number;
}

interface ScrollerOptions {
  scrollingX: boolean;
  scrollingY: boolean;
  animating: boolean;
  animationDuration: number;
  bouncing: boolean;
  snapping: boolean;
}

export class Scroller {
  options: ScrollerOptions = {
    scrollingX: true,
    scrollingY: true,
    animating: true,
    animationDuration: 250,
    bouncing: true,
    snapping: false
  };

  private animate = new Animate();
  private animatingId!: number | null;
  private deceleratingId!: number | null;

  private move$ = new Subject<ScrollerMove>();
  private complete$ = new Subject();

  private containerW!: number;
  private containerH!: number;
  private contentW!: number;
  private contentH!: number;

  private snapW!: number;
  private snapH!: number;

  private scrollMinX!: number;
  private scrollMinY!: number;

  private isTracking = false;
  // private initialTouchX: number;
  // private initialTouchY: number;
  private lastTouchX!: number;
  private lastTouchY!: number;
  private lastTimestamp!: number;

  private scrollX = 0;
  private scrollY = 0;

  private velocityX!: number;
  private velocityY!: number;

  private positions!: Array<{ scrollX: number; scrollY: number; timestamp: number }>;

  /** This configures the amount of change applied to deceleration when reaching boundaries  **/
  private penetrationDeceleration = 0.03;

  /** This configures the amount of change applied to acceleration when reaching boundaries  **/
  private penetrationAcceleration = 0.08;

  private friction = 0.95;

  get move() {
    return this.move$.asObservable();
  }

  get complete() {
    return this.complete$.asObservable();
  }

  constructor(options: Partial<ScrollerOptions> = {}) {
    Object.assign(this.options, options);
  }

  setOptions(options: Partial<ScrollerOptions> = {}) {
    Object.assign(this.options, options);
  }

  setDimensions(containerW: number, containerH: number, contentW: number, contentH: number) {
    this.containerW = containerW;
    this.containerH = containerH;
    this.contentW = contentW;
    this.contentH = contentH;

    this.computeScrollBoundary();
  }

  setSnapSize(w: number, h: number) {
    this.snapW = w;
    this.snapH = h;
  }

  getPosition(): ScrollerMove {
    return {
      scrollX: this.scrollX,
      scrollY: this.scrollY
    };
  }

  handleTouchStart(touches: TouchEvent['touches'], timestamp: TouchEvent['timeStamp']) {
    this.isTracking = true;

    if (this.animatingId) {
      this.animate.stop(this.animatingId);
      this.animatingId = null;
    }

    if (this.deceleratingId) {
      this.animate.stop(this.deceleratingId);
      this.deceleratingId = null;
    }

    // this.initialTouchX = touches[0].pageX;
    // this.initialTouchY = touches[0].pageY;

    this.lastTouchX = touches[0].pageX;
    this.lastTouchY = touches[0].pageY;
    this.lastTimestamp = timestamp;

    this.positions = [];
  }

  handleTouchMove(touches: TouchEvent['touches'], timestamp: TouchEvent['timeStamp']) {
    if (!this.isTracking) {
      return;
    }

    const currentTouchX = touches[0].pageX;
    const currentTouchY = touches[0].pageY;
    let scrollX = this.scrollX;
    let scrollY = this.scrollY;

    if (this.options.scrollingX) {
      const moveX = currentTouchX - this.lastTouchX;
      scrollX += moveX;
      if (scrollX > 0 || scrollX < this.scrollMinX) {
        if (this.options.bouncing) {
          scrollX -= moveX / 2;
        } else if (scrollX > 0) {
          scrollX = 0;
        } else {
          scrollX = this.scrollMinX;
        }
      }
    }

    if (this.options.scrollingY) {
      const moveY = currentTouchY - this.lastTouchY;
      scrollY += moveY;
      if (scrollY > 0 || scrollY < this.scrollMinY) {
        if (this.options.bouncing) {
          scrollY -= moveY / 2;
        } else if (scrollY > 0) {
          scrollY = 0;
        } else {
          scrollY = this.scrollMinY;
        }
      }
    }

    this.emit(scrollX, scrollY);

    if (this.positions.length > 20) {
      this.positions.splice(0, 10);
    }
    this.positions.push({ scrollX, scrollY, timestamp });

    this.lastTouchX = currentTouchX;
    this.lastTouchY = currentTouchY;
    this.lastTimestamp = timestamp;
  }

  handleTouchEnd(timestamp: TouchEvent['timeStamp']) {
    if (!this.isTracking) {
      return;
    }
    this.isTracking = false;

    if (this.options.animating && timestamp - this.lastTimestamp < 100) {
      const positions = this.positions;

      const endIndex = positions.length - 1;
      let startIndex = endIndex;

      for (; startIndex > 0 && positions[startIndex].timestamp > this.lastTimestamp - 100; startIndex--) {}
      if (startIndex !== endIndex) {
        // (px/ms) * (ms/frame) = px/frame
        this.velocityX =
          ((positions[endIndex].scrollX - positions[startIndex].scrollX) /
            (positions[endIndex].timestamp - positions[startIndex].timestamp)) *
          (1000 / 60);
        this.velocityY =
          ((positions[endIndex].scrollY - positions[startIndex].scrollY) /
            (positions[endIndex].timestamp - positions[startIndex].timestamp)) *
          (1000 / 60);

        const minVelocityToStartDeceleration = 1;
        if (
          Math.abs(this.velocityX) >= minVelocityToStartDeceleration ||
          Math.abs(this.velocityY) >= minVelocityToStartDeceleration
        ) {
          this.startDeceleration();
        } else {
          this.complete$.next();
        }
      } else {
        // this.complete$.next();
      }
    } else if (timestamp - this.lastTimestamp > 100) {
      this.complete$.next();
    }

    if (!this.deceleratingId) {
      this.scrollTo(this.scrollX, this.scrollY, this.options.animating);
    }
    // clear
    this.positions = [];
  }

  scrollTo(scrollX: number, scrollY: number, animating = false) {
    if (this.deceleratingId) {
      this.animate.stop(this.deceleratingId);
      this.deceleratingId = null;
    }

    if (this.options.scrollingX) {
      if (this.options.snapping) {
        scrollX = Math.round(scrollX / this.snapW) * this.snapW;
      }
    } else {
      scrollX = this.scrollX;
    }

    if (this.options.scrollingY) {
      if (this.options.snapping) {
        scrollY = Math.round(scrollY / this.snapH) * this.snapH;
      }
    } else {
      scrollY = this.scrollY;
    }

    scrollX = Math.max(Math.min(scrollX, 0), this.scrollMinX);
    scrollY = Math.max(Math.min(scrollY, 0), this.scrollMinY);

    if (scrollX === this.scrollX && scrollY === this.scrollY) {
      animating = false;
    }

    if (!this.isTracking) {
      this.emit(scrollX, scrollY, animating);
    }
  }

  private emit(scrollX: number, scrollY: number, animating = false) {
    if (this.animatingId) {
      this.animate.stop(this.animatingId);
      this.animatingId = null;
    }

    if (animating) {
      const oriScrollX = this.scrollX;
      const oriScrollY = this.scrollY;

      const diffX = scrollX - oriScrollX;
      const diffY = scrollY - oriScrollY;

      const stepCb = (percent: number, now: number, render: boolean) => {
        if (render) {
          this.scrollX = oriScrollX + diffX * percent;
          this.scrollY = oriScrollY + diffY * percent;

          this.move$.next({ scrollX: this.scrollX, scrollY: this.scrollY });
        }
      };

      const completeCb = (frames: number, id: number, finished: boolean) => {
        this.animatingId = null;
        if (finished) {
          this.complete$.next();
        }
      };

      this.animatingId = this.animate.start(stepCb, undefined, completeCb, this.options.animationDuration);
    } else {
      this.scrollX = scrollX;
      this.scrollY = scrollY;
      this.move$.next({ scrollX, scrollY });
    }
  }

  private computeScrollBoundary() {
    this.scrollMinX = Math.min(this.containerW - this.contentW, 0);
    this.scrollMinY = Math.min(this.containerH - this.contentH, 0);
  }

  private startDeceleration() {
    const stepCb = (precent: number, now: number, render: boolean) => {
      this.stepInDeceleration(render);
    };

    const minVelocityToKeep = this.options.snapping ? 4 : 0.1;

    let isDeclerationCompleted = false;

    const verifyCb = () => {
      const keep = Math.abs(this.velocityX) > minVelocityToKeep || Math.abs(this.velocityY) > minVelocityToKeep;
      if (!keep) {
        isDeclerationCompleted = true;
      }
      return keep;
    };

    const completeCb = () => {
      this.deceleratingId = null;
      if (isDeclerationCompleted) {
        this.complete$.next();
      }
      this.scrollTo(this.scrollX, this.scrollY, this.options.snapping);
    };

    this.deceleratingId = this.animate.start(stepCb, verifyCb, completeCb);
  }

  private stepInDeceleration(render: boolean) {
    let scrollX = this.scrollX + this.velocityX;
    let scrollY = this.scrollY + this.velocityY;

    if (!this.options.bouncing) {
      const scrollXFixed = Math.max(Math.min(scrollX, 0), this.scrollMinX);
      const scrollYFixed = Math.max(Math.min(scrollY, 0), this.scrollMinY);

      if (scrollXFixed !== scrollX) {
        scrollX = scrollXFixed;
        this.velocityX = 0;
      }

      if (scrollYFixed !== scrollY) {
        scrollY = scrollYFixed;
        this.velocityY = 0;
      }
    }

    if (render) {
      this.emit(scrollX, scrollY);
    } else {
      this.scrollX = scrollX;
      this.scrollY = scrollY;
    }

    this.velocityX *= this.friction;
    this.velocityY *= this.friction;

    if (this.options.bouncing) {
      let overstepX = 0;
      let overstepY = 0;

      if (scrollX > 0) {
        overstepX = 0 - scrollX;
      } else if (scrollX < this.scrollMinX) {
        overstepX = this.scrollMinX - scrollX;
      }

      if (scrollY > 0) {
        overstepY = 0 - scrollY;
      } else if (scrollY < this.scrollMinY) {
        overstepY = this.scrollMinY - scrollY;
      }

      if (overstepX !== 0) {
        if (overstepX * this.velocityX <= 0) {
          this.velocityX += overstepX * this.penetrationDeceleration;
        } else {
          this.velocityX = overstepX * this.penetrationAcceleration;
        }
      }

      if (overstepY !== 0) {
        if (overstepY * this.velocityY <= 0) {
          this.velocityY += overstepY * this.penetrationDeceleration;
        } else {
          this.velocityY = overstepY * this.penetrationAcceleration;
        }
      }
    }
  }
}
