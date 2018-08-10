import { async, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { AddCourseComponent } from './add-course.component';
import { MaterialModule } from '../../material/material.module';
import { CoursesService } from '../courses.service';

import { RouterStub, ActivatedRouteStub } from '../../testing/router-stubs';
import { appRoutingPaths } from '../../app.routing.paths';

describe('AddCourseComponent', () => {
  const coursesServiceStub: Partial<CoursesService> = {
    createCourse: () => of(null),
  };

  let component: AddCourseComponent;
  let service: CoursesService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCourseComponent],
      imports: [
        FormsModule,
        MaterialModule,
      ],
      providers: [
        AddCourseComponent,
        { provide: CoursesService, useValue: coursesServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(AddCourseComponent);
    service = TestBed.get(CoursesService);
    router = TestBed.get(Router);
  });

  it('should instantiate successfully', () => {
    expect(component).toBeDefined();
  });

  it('should receive course duration', () => {
    component.onDurationChange(123);
    expect(component.course.durationMin).toBe(123);
  });

  it('should receive course creation date', () => {
    component.onDateChange(1234567890);
    expect(component.course.creationDate).toBe(1234567890);
  });

  it('should create course on save', () => {
    spyOn(service, 'createCourse').and.callThrough();
    component.onSaveClick();
    expect(service.createCourse).toHaveBeenCalled();
  });

  it('should navigate away on save', () => {
    spyOn(router, 'navigateByUrl');
    component.onSaveClick();
    expect(router.navigateByUrl).toHaveBeenCalledWith(appRoutingPaths.courses);
  });

  it('should navigate away on cancel', () => {
    spyOn(router, 'navigateByUrl');
    component.onCancelClick();
    expect(router.navigateByUrl).toHaveBeenCalledWith(appRoutingPaths.courses);
  });
});
