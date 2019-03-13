import { DomPortalOutlet } from '@angular/cdk/portal';

import { Subject } from 'rxjs';

import { LightComponent } from './light.component';
import { BcLightConfig } from './light.service';

export class LightRef {
  private _afterClosed = new Subject<void>();

  constructor(public componentInstance: LightComponent, private portal: DomPortalOutlet) {
    this.componentInstance._onExit.subscribe(() => {
      this.finishClose();
    });
  }

  close() {
    if (!this._afterClosed.closed) {
      this.componentInstance.exit();
    }
  }

  next(focusElement: HTMLElement, config?: BcLightConfig) {
    const componentInstance = this.componentInstance;

    componentInstance.focusElement = focusElement;
    componentInstance.setProps(config);
    componentInstance.detectChanges();
    componentInstance.updateFocusPosition();
  }

  backdropClick() {
    return this.componentInstance.backdropClick;
  }

  afterOpened() {
    return this.componentInstance._onEnter;
  }

  afterClosed() {
    return this._afterClosed.asObservable();
  }

  private finishClose() {
    this.portal.dispose();

    this._afterClosed.next();
    this._afterClosed.complete();
  }
}
