import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { MaterialModule } from '../../../material/material.module';

@Component({
  template: `
  <div appHighlight [course]="course" [isCourseUpcoming]="true">
    <mat-card>
      <div>
        <mat-card-title>titleUpcoming</mat-card-title>
      </div>
    </mat-card>
  </div>
  <div appHighlight [course]="course" [isCourseFresh]="true">
    <mat-card>
      <div>
        <mat-card-title>titleFresh</mat-card-title>
      </div>
    </mat-card>
  </div>
  <div appHighlight [course]="courseTopRated">
    <mat-card>
      <div>
        <mat-card-title>titleTopRated</mat-card-title>
      </div>
    </mat-card>
  </div>
  <div appHighlight [course]="course">
    <mat-card>
      <div>
        <mat-card-title>titleOld</mat-card-title>
      </div>
    </mat-card>
  </div>
  `
})
class TestComponent {
  courseTopRated = { topRated: true };
  course = {};
}


describe('HighlightDirective', () => {
  let fixture;
  let des;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        HighlightDirective,
        TestComponent,
      ],
      imports: [MaterialModule]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.css('[appHighlight]'));
  });

  it('should create a test component with three relevant elements', () => {
    expect(des.length).toBe(4);
  });

  it('should set card class for upcoming course', () => {
    const el = des[0].query(By.css('mat-card')).nativeElement;
    expect(el.className).toContain('mat-card_upcoming');
  });

  it('should set card class for fresh course', () => {
    const el = des[1].query(By.css('mat-card')).nativeElement;
    expect(el.className).toContain('mat-card_fresh');
  });

  it('should set card class for fresh course', () => {
    const el = des[2].query(By.css('mat-card')).nativeElement;
    expect(el.className).toContain('mat-card_top-rated');
  });

  it('should not update card class for old course', () => {
    const el = des[3].query(By.css('mat-card')).nativeElement;
    expect(el.className).toBe('mat-card');
  });
});
