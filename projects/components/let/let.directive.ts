/**
 * inspired by
 * @see https://blog.angularindepth.com/having-fun-with-structural-directives-in-angular-69b4d229ad93
 * @see https://github.com/ngrx-utils/ngrx-utils/blob/master/projects/store/src/directives/ngLet.ts
 * @see https://angular.cn/guide/structural-directives#microsyntax
 */

import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

export class BcLetContext {
  $implicit: any = null;
  bcLet: any = null;
}

@Directive({ selector: '[bcLet]' })
export class LetDirective implements OnInit {
  @Input()
  set bcLet(v: any) {
    this.context.$implicit = this.context.bcLet = v;
  }

  private context = new BcLetContext();

  constructor(private vcr: ViewContainerRef, private tr: TemplateRef<BcLetContext>) {}

  ngOnInit() {
    this.vcr.createEmbeddedView(this.tr, this.context);
  }
}
