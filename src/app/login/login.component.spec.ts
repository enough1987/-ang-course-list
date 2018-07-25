import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';

class AuthServiceStub {
  login = jasmine.createSpy('login', () => {});
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MaterialModule,   // material is used in the template
        FormsModule,      // ngModel is used in the template
      ],
      providers: [
        LoginComponent,
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(LoginComponent);
    service = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login service method', () => {
    const submitEvent = {
      preventDefault: jasmine.createSpy('preventDefault', () => {}),
    } as any;

    component.onSubmit(submitEvent);

    expect(service.login).toHaveBeenCalled();
  });
});
