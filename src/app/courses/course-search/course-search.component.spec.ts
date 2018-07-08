import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseSearchComponent } from './course-search.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';

describe('CourseSearchComponent', () => {
  let component: CourseSearchComponent;
  let fixture: ComponentFixture<CourseSearchComponent>;

  beforeEach(async(() => {
    spyOn(console, 'log');

    TestBed.configureTestingModule({
      declarations: [CourseSearchComponent],
      imports: [
        MaterialModule,   // material is used in the template
        FormsModule,      // ngModel is used in the template
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log to console on search click', () => {
    component.query = 'needle';
    fixture.detectChanges();

    component.onSearchClick();

    expect(console.log).toHaveBeenCalledWith('Searching for needle');
  });

  it('should log to console on search button click', () => {
    component.query = 'love';
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const button = el.querySelector('button');

    button.click();
    expect(console.log).toHaveBeenCalledWith('Searching for love');
  });

  it('should update the search input when ngModel input changes', fakeAsync(() => {
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('input')).nativeElement;
    element.value = 'neeeedle';

    // https://angular.io/guide/testing#change-an-input-value-with-dispatchevent
    element.dispatchEvent(new Event('input'));

    tick();
    fixture.detectChanges();

    expect(component.query).toBe('neeeedle');
  }));
});
