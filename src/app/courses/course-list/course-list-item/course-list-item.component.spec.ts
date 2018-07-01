import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChanges, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CourseListItemComponent } from './course-list-item.component';
import { Course } from './course.model';
import { MaterialModule } from '../../../material/material.module';

import mouseEvent from '../../../testing/mouse-event.stub';

describe('CourseListItemComponent', () => {
  const course: Course = {
    id: 42,
    creationDate: 1530287255,
    title: 'the Ultimate Course',
    durationMin: 123,
    description: 'on Life, the Universe, and Everything',
  };

  const simpleChanges: SimpleChanges = {
    course: {
      currentValue: course,
      firstChange: true,
      previousValue: null,
      isFirstChange: () => true,
    }
  };

  beforeEach(() => {
    spyOn(console, 'log');
  });

  describe('component class testing', () => {
    it('should instantiate successfully', () => {
      const component = new CourseListItemComponent();
      expect(component).toBeDefined();
      expect(console.log).toHaveBeenCalledWith('constructor');
    });

    it('should log to console when constructor is called', () => {
      const component = new CourseListItemComponent();

      expect(console.log).toHaveBeenCalledWith('constructor');
    });

    it('should log to console on ngOnChanges hook', () => {
      const component = new CourseListItemComponent();
      component.ngOnChanges(simpleChanges);

      expect(console.log).toHaveBeenCalledWith('ngOnChanges, SimpleChanges object: ', simpleChanges);
    });

    it('should log to console on ngOnInit hook', () => {
      const component = new CourseListItemComponent();
      component.ngOnInit();

      expect(console.log).toHaveBeenCalledWith('ngOnInit');
    });

    it('should parse duration time to the correct format', () => {
      const component = new CourseListItemComponent();
      component.course = course;

      expect(component.parseTime()).toBe('2h 03m');
    });

    it('should parse creation date to the correct format', () => {
      const component = new CourseListItemComponent();
      component.course = course;

      expect(component.parseDate()).toBe('29/06/2018');
    });

    it('should emit input course ID on Edit click', () => {
      const component = new CourseListItemComponent();
      component.course = course;

      component.edit.subscribe(id => expect(id).toBe(course.id));
      component.onEditClick();
    });

    it('should emit mouse event on Delete click', () => {
      const component = new CourseListItemComponent();
      component.course = course;

      component.delete.subscribe(({ event }) => expect(event).toBe(mouseEvent));
      component.onDeleteClick(mouseEvent);
    });

    it('should emit input course ID on Delete click', () => {
      const component = new CourseListItemComponent();
      component.course = course;

      component.delete.subscribe(({ id }) => expect(id).toBe(course.id));
      component.onDeleteClick(mouseEvent);
    });
  });

  describe('component DOM testing', () => {
    let component: CourseListItemComponent;
    let fixture: ComponentFixture<CourseListItemComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ CourseListItemComponent ],
        imports: [ MaterialModule ],  // material is used in the template
      });

      fixture = TestBed.createComponent(CourseListItemComponent);
      component = fixture.componentInstance;
    });

    afterEach(() => console.log('afterEach'));

    it('should instantiate successfully', () => {
      expect(component).toBeDefined();
    });

    it('should display the passed course title', () => {
      // https://angular.io/guide/testing#detectchanges
      component.course = course;
      fixture.detectChanges();

      // https://angular.io/guide/testing#nativeelement
      const courseElement: HTMLElement = fixture.nativeElement;

      const title = courseElement.querySelector('mat-card-title');

      expect(title.textContent).toEqual('the Ultimate Course');
    });

    it('should display the passed course description', () => {
      component.course = course;
      fixture.detectChanges();

      // https://angular.io/guide/testing#debugelement
      const courseDe: DebugElement = fixture.debugElement;
      const courseEl: HTMLElement = courseDe.nativeElement;

      const title = courseEl.querySelector('mat-card-content');

      expect(title.textContent).toEqual('on Life, the Universe, and Everything');
    });

    it('should display the parsed course duration correctly', () => {
      component.course = course;
      fixture.detectChanges();

      // https://angular.io/guide/testing#bycss
      const courseDe: DebugElement = fixture.debugElement;
      const timeDe = courseDe.query(By.css('.course-list-item__details div'));
      const time: HTMLElement = timeDe.nativeElement;
      expect(time.textContent).toEqual('2h 03m');
    });

    it('should display the parsed course creation date correctly', () => {
      component.course = course;
      fixture.detectChanges();

      const courseDe: DebugElement = fixture.debugElement;
      const timeDe = courseDe.query(By.css('.course-list-item__details div:nth-of-type(2)'));
      const time: HTMLElement = timeDe.nativeElement;
      expect(time.textContent).toEqual('29/06/2018');
    });

    it('should emit input course ID on Edit button click', () => {
      component.course = course;
      fixture.detectChanges();

      const courseDe: DebugElement = fixture.debugElement;
      const buttonDe = courseDe.query(By.css('[mat-raised-button]:nth-of-type(1)'));

      component.edit.subscribe(id => expect(id).toBe(course.id));
      buttonDe.triggerEventHandler('click', null);
    });

    it('should emit mouse event on Delete button click', () => {
      component.course = course;
      fixture.detectChanges();

      const courseDe: DebugElement = fixture.debugElement;
      const buttonDe = courseDe.query(By.css('[mat-raised-button]:nth-of-type(2)'));

      component.delete.subscribe(({ event }) => expect(event).toEqual(mouseEvent));
      buttonDe.triggerEventHandler('click', mouseEvent);
    });

    it('should emit input course ID on Delete button click', () => {
      component.course = course;
      fixture.detectChanges();

      const courseDe: DebugElement = fixture.debugElement;
      const buttonDe = courseDe.query(By.css('[mat-raised-button]:nth-of-type(2)'));

      component.delete.subscribe(({ id }) => expect(id).toBe(course.id));
      buttonDe.triggerEventHandler('click', null);
    });
  });

});
