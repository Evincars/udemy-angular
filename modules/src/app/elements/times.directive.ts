import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appTimes]',
})
export class TimesDirective {
  constructor(
    private viewRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input('appTimes') public set render(times: number) {
    this.viewRef.clear();

    for (let i = 0; i < times; i++) {
      this.viewRef.createEmbeddedView(this.templateRef, {});
    }
  }
}
