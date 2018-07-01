import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { MaterialModule } from '../../material/material.module';

import mouseEvent from '../../testing/mouse-event.stub';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(() => {
    spyOn(console, 'log');

    TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [MaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log to console on load click', () => {
    component.onLoadClick(mouseEvent);

    expect(console.log).toHaveBeenCalledWith('Loading more courses. MouseEvent: ', mouseEvent);
  });
});
