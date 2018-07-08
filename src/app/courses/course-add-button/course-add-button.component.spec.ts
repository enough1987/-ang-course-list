import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddButtonComponent } from './course-add-button.component';

describe('CourseAddButtonComponent', () => {
  let component: CourseAddButtonComponent;
  let fixture: ComponentFixture<CourseAddButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAddButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
