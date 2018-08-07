import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { MaterialModule } from '../../material/material.module';

import { RouterStub } from '../../testing/router-stubs';
import { appRoutingPaths } from '../../app.routing.paths';
import { coursesRoutingPaths } from '../courses.routing.paths';


describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [MaterialModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Router, useClass: RouterStub}],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set query on search', () => {
    component.onSearch('QUERY');
    expect(component.query).toBe('QUERY');
  });

  it('should navigate to add course', () => {
    spyOn(router, 'navigateByUrl');
    component.onAddCourse();
    expect(router.navigateByUrl).toHaveBeenCalledWith(`${appRoutingPaths.courses}/${coursesRoutingPaths.new}`);
  });

});
