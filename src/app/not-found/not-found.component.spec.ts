import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

import { NotFoundComponent } from './not-found.component';

class AuthServiceStub {
  login = jasmine.createSpy('login', () => {});
}

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      imports: [
        MaterialModule,   // material is used in the template
        FormsModule,      // ngModel is used in the template
      ],
      providers: [
        NotFoundComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(NotFoundComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
