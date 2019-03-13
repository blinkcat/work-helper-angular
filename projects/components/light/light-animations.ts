import { trigger, style, animate, transition, AnimationTriggerMetadata, state } from '@angular/animations';

export const lightAnimations: {
  readonly lightState: AnimationTriggerMetadata;
} = {
  lightState: trigger('state', [
    state(
      'hidden, void',
      style({
        opacity: 0
      })
    ),
    state(
      'visible',
      style({
        opacity: 1
      })
    ),
    transition('void => visible', animate('300ms cubic-bezier(0, 0, 0.2, 1)')),
    transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
  ])
};
