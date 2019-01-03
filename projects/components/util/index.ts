import { TemplateRef } from '@angular/core';

export function isTemplateRef(prop: any) {
  return prop instanceof TemplateRef;
}
