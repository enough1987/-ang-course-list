import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChanges, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CourseListItemComponent } from './course-list-item.component';
import { Course } from './course.model';
import { MaterialModule } from '../../../material/material.module';

describe('CourseListItemComponent', () => {
  const course: Course = {
    id: 42,
    creationDate: 1530287255,
    title: 'the Ultimate Course',
    durationMin: 123,
    description: 'on Life, the Universe, and Everything',
  };

  const mouseEvent = {    // : MouseEvent
    altKey: false,
    button: 0,
    buttons: 0,
    clientX: 42,
    clientY: 84,
    ctrlKey: false,
    fromElement: null,
    layerX: 42,
    layerY: 84,
    metaKey: false,
    movementX:  0,
    movementY: 0,
    offsetX: 42,
    offsetY: 84,
    pageX: 42,
    pageY: 84,
    relatedTarget: null,
    screenX: 142,
    screenY: 184,
    shiftKey: false,
    toElement: null,
    which: 1,
    x: 42,
    y: 84,
    getModifierState: () => false,
    initMouseEvent: () => {},
    detail: 1,
    view: window,
    initUIEvent: () => {},
    bubbles: true,
    cancelBubble: false,
    cancelable: true,
    currentTarget: null,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: true,
    returnValue: true,
    scoped: false,
    srcElement: null,
    target: null,
    timeStamp: 4284,
    type: 'click',
    deepPath: () => null,
    initEvent: () => {},
    preventDefault: () => {},
    stopImmediatePropagation: () => {},
    stopPropagation: () => {},
    AT_TARGET: null,
    BUBBLING_PHASE: 0,
    CAPTURING_PHASE: 0,
    NONE: 0,
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
      const comp = new CourseListItemComponent();
      expect(comp).toBeDefined();
      expect(console.log).toHaveBeenCalledWith('constructor');
    });

    it('should log to console when constructor is called', () => {
      const comp = new CourseListItemComponent();

      expect(console.log).toHaveBeenCalledWith('constructor');
    });

    it('should log to console on ngOnChanges hook', () => {
      const comp = new CourseListItemComponent();
      comp.ngOnChanges(simpleChanges);

      expect(console.log).toHaveBeenCalledWith('ngOnChanges, SimpleChanges object: ', simpleChanges);
    });

    it('should log to console on ngOnInit hook', () => {
      const comp = new CourseListItemComponent();
      comp.ngOnInit();

      expect(console.log).toHaveBeenCalledWith('ngOnInit');
    });

    it('should log to console on ngDoCheck hook', () => {
      const comp = new CourseListItemComponent();
      comp.ngDoCheck();

      expect(console.log).toHaveBeenCalledWith('ngDoCheck');
    });

    it('should log to console on ngAfterContentInit hook', () => {
      const comp = new CourseListItemComponent();
      comp.ngAfterContentInit();

      expect(console.log).toHaveBeenCalledWith('ngAfterContentInit');
    });

    it('should log to console on ngAfterContentChecked hook', () => {
      const comp = new CourseListItemComponent();
      comp.ngAfterContentChecked();

      expect(console.log).toHaveBeenCalledWith('ngAfterContentChecked');
    });

    it('should log to console on ngAfterViewInit hook', () => {
      const comp = new CourseListItemComponent();
      comp.ngAfterViewInit();

      expect(console.log).toHaveBeenCalledWith('ngAfterViewInit');
    });

    it('should log to console on ngAfterViewChecked hook', () => {
      const comp = new CourseListItemComponent();
      comp.ngAfterViewChecked();

      expect(console.log).toHaveBeenCalledWith('ngAfterViewChecked');
    });

    it('should log to console on ngOnDestroy hook', () => {
      const comp = new CourseListItemComponent();
      comp.ngOnDestroy();

      expect(console.log).toHaveBeenCalledWith('ngOnDestroy');
    });

    it('should parse duration time to the correct format', () => {
      const comp = new CourseListItemComponent();
      comp.course = course;

      expect(comp.parseTime()).toBe('2h 03m');
    });

    it('should parse creation date to the correct format', () => {
      const comp = new CourseListItemComponent();
      comp.course = course;

      expect(comp.parseDate()).toBe('29/06/2018');
    });

    it('should emit input course ID on Edit click', () => {
      const comp = new CourseListItemComponent();
      comp.course = course;

      comp.edit.subscribe(id => expect(id).toBe(course.id));
      comp.onEditClick();
    });

    it('should emit mouse event on Delete click', () => {
      const comp = new CourseListItemComponent();
      comp.course = course;

      comp.delete.subscribe(({ event }) => expect(event).toBe(mouseEvent));
      comp.onDeleteClick(mouseEvent);
    });

    it('should emit input course ID on Delete click', () => {
      const comp = new CourseListItemComponent();
      comp.course = course;

      comp.delete.subscribe(({ id }) => expect(id).toBe(course.id));
      comp.onDeleteClick(mouseEvent);
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
