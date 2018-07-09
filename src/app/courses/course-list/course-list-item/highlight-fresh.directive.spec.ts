import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { HighlightFreshDirective } from './highlight-fresh.directive';
import { MaterialModule } from '../../../material/material.module';

@Component({
  template: `
  <div appHighlightFresh [course]="courseUpcoming">
    <mat-card>
      <div>
        <mat-card-title>titleUpcoming</mat-card-title>
      </div>
    </mat-card>
  </div>
  <div appHighlightFresh [course]="courseFresh">
    <mat-card>
      <div>
        <mat-card-title>titleFresh</mat-card-title>
      </div>
    </mat-card>
  </div>
  <div appHighlightFresh [course]="courseOld">
    <mat-card>
      <div>
        <mat-card-title>titleOld</mat-card-title>
      </div>
    </mat-card>
  </div>
  `
})
class TestComponent {
  dayms = 86400000;
  courseUpcoming = { creationDate: (Date.now() + this.dayms) };
  courseFresh = { creationDate: (Date.now() - this.dayms) };
  courseOld = { creationDate: (Date.now() - 30 * this.dayms) };
}


describe('HighlightFreshDirective', () => {
  let fixture;
  let des;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        HighlightFreshDirective,
        TestComponent,
      ],
      imports: [MaterialModule]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.css('[appHighlightFresh]'));
  });

  it('should create a test component with three relevant elements', () => {
    expect(des.length).toBe(3);
  });

  it('should set card class for upcoming course', () => {
    const el = des[0].query(By.css('mat-card')).nativeElement;
    expect(el.className).toContain('mat-card_upcoming');
  });

  it('should set card class for fresh course', () => {
    const el = des[1].query(By.css('mat-card')).nativeElement;
    expect(el.className).toContain('mat-card_fresh');
  });

  it('should not update card class for old course', () => {
    const el = des[2].query(By.css('mat-card')).nativeElement;
    expect(el.className).toBe('mat-card');
  });

  it('should set title class for upcoming course', () => {
    const el = des[0].query(By.css('mat-card-title')).nativeElement;
    expect(el.className).toContain('mat-card-title_upcoming');
  });

  it('should set title class for fresh course', () => {
    const el = des[1].query(By.css('mat-card-title')).nativeElement;
    expect(el.className).toContain('mat-card-title_fresh');
  });

  it('should not update title class for old course', () => {
    const el = des[2].query(By.css('mat-card-title')).nativeElement;
    expect(el.className).toBe('mat-card-title');
  });

  it('should append relevant icon to title for upcoming course', () => {
    const el = des[0].query(By.css('mat-card-title > mat-icon'));
    expect(el.nativeElement.textContent).toBe('alarm');
  });

  it('should append relevant icon to title for fresh course', () => {
    const el = des[1].query(By.css('mat-card-title > mat-icon'));
    expect(el.nativeElement.textContent).toBe('alarm_on');
  });

  it('should not append icon to title for old course', () => {
    const el = des[2].query(By.css('mat-card-title > mat-icon'));
    expect(el).toBeNull();
  });

  it('should append relevant desciption to title for upcoming course', () => {
    const el = des[0].query(By.css('mat-card-title > sup'));
    expect(el.nativeElement.textContent).toBe('upcoming');
  });

  it('should append relevant desciption to title for fresh course', () => {
    const el = des[1].query(By.css('mat-card-title > sup'));
    expect(el.nativeElement.textContent).toBe('fresh');
  });

  it('should not append desciption to title for old course', () => {
    const el = des[2].query(By.css('mat-card-title > sup'));
    expect(el).toBeNull();
  });
});
