import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";

@Directive({
  selector: "[appTimes]",
})
export class TimesDirective {
  constructor(
    private containerRef: ViewContainerRef, // current el where structural direcitve is applied
    private templateRef: TemplateRef<any> // elements inside parent element
  ) {}

  // whenever appTimes is applied on element, we're gonna call render(...) instead
  @Input('appTimes') set render(times: number) {
    this.containerRef.clear();

    for (let i = 0; i < times; i++) {
      this.containerRef.createEmbeddedView(this.templateRef, {
        index: i
      });
    }
  }
}
