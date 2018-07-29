import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDateComponent } from './course-date.component';
import { MaterialModule } from '../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

describe('CourseDateComponent', () => {
  let component: CourseDateComponent;
  let fixture: ComponentFixture<CourseDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDateComponent],
      imports: [
        MaterialModule,           // material is used in the template
        BrowserAnimationsModule,  // required by material
        ReactiveFormsModule,      // formControl is used in the template
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on change', () => {
    component.date = new FormControl(1234567890);
    spyOn(component.dateChange, 'emit');
    component.onDateChange();
    expect(component.dateChange.emit).toHaveBeenCalledWith(1234567890);
  });

  it('should not emit on change if value is invalid', () => {
    component.date = new FormControl(null);
    spyOn(component.dateChange, 'emit');
    component.onDateChange();
    expect(component.dateChange.emit).not.toHaveBeenCalled();
  });
});
