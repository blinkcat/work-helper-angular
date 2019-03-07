import { NgModule } from '@angular/core';

import { LetDirective } from './let.directive';

@NgModule({
  exports: [LetDirective],
  declarations: [LetDirective]
})
export class LetModule {}
