import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Course } from './course.model';

@Directive({
  selector: '[appHighlightFresh]'
})
export class HighlightFreshDirective implements OnInit {
  @Input() course: Course;

  private el: HTMLElement;

  constructor(
    elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.el = elementRef.nativeElement;
  }

  ngOnInit() {
    const now = Date.now();
    const dayms = 86400000;   // milliseconds in a day

    if (this.course.creationDate < now && this.course.creationDate >= now - 14 * dayms) { // fresh
      this.renderer.addClass(this.el.querySelector('mat-card'), 'mat-card_fresh');
      this.renderer.addClass(this.el.querySelector('mat-card-title'), 'mat-card-title_fresh');

      const icon = this.renderer.createElement('mat-icon');
      const name = this.renderer.createText('alarm_on');
      this.renderer.appendChild(icon, name);
      this.renderer.addClass(icon, 'material-icons');
      this.renderer.addClass(icon, 'mat-icon');
      this.renderer.setStyle(icon, 'vertical-align', 'text-bottom');
      this.renderer.appendChild(this.el.querySelector('mat-card-title'), icon);

      const sup = this.renderer.createElement('sup');
      const text = this.renderer.createText('fresh');
      this.renderer.appendChild(sup, text);
      this.renderer.setStyle(sup, 'font-size', '12px');
      this.renderer.appendChild(this.el.querySelector('mat-card-title'), sup);

    } else if (this.course.creationDate > now) {  // upcoming
      this.renderer.addClass(this.el.querySelector('mat-card'), 'mat-card_upcoming');
      this.renderer.addClass(this.el.querySelector('mat-card-title'), 'mat-card-title_upcoming');

      const icon = this.renderer.createElement('mat-icon');
      const name = this.renderer.createText('alarm');
      this.renderer.appendChild(icon, name);
      this.renderer.addClass(icon, 'material-icons');
      this.renderer.addClass(icon, 'mat-icon');
      this.renderer.setStyle(icon, 'vertical-align', 'text-bottom');
      this.renderer.appendChild(this.el.querySelector('mat-card-title'), icon);

      const sup = this.renderer.createElement('sup');
      const text = this.renderer.createText('upcoming');
      this.renderer.appendChild(sup, text);
      this.renderer.setStyle(sup, 'font-size', '12px');
      this.renderer.appendChild(this.el.querySelector('mat-card-title'), sup);
    }
  }

}
