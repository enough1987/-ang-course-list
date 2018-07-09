import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListNoDataComponent } from './courses-list-no-data.component';
import { MaterialModule } from '../../../material/material.module';

describe('CoursesListNoDataComponent', () => {
  let component: CoursesListNoDataComponent;
  let fixture: ComponentFixture<CoursesListNoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListNoDataComponent],
      imports: [MaterialModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
