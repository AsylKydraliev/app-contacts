import {Directive, HostListener} from "@angular/core";

@Directive({
  selector: "[click-stop-propagation]"
})

export class stopPropagationDirective {
  @HostListener("click", ["$event"])

  public onClick(event: any): void {
    event.stopPropagation();
  }
}
