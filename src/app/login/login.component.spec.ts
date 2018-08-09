import { async, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../shared/services';
import { RouterStub } from '../testing/router-stubs';
import { appRoutingPaths } from '../app.routing.paths';


class AuthServiceStub {
  login = (): Observable<any> => of({ auth: true });
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: AuthService;
  let router: Router;

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
        { provide: Router, useClass: RouterStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(LoginComponent);
    service = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login service method', () => {
    const submitEvent = {
      preventDefault: jasmine.createSpy('preventDefault', () => {}),
    } as any;

    spyOn(service, 'login').and.callThrough();

    component.onSubmit(submitEvent);

    expect(service.login).toHaveBeenCalled();
  });

  it('should navigate to courses on successfull login', () => {
    const submitEvent = {
      preventDefault: jasmine.createSpy('preventDefault', () => {}),
    } as any;

    spyOn(router, 'navigateByUrl').and.callThrough();

    component.onSubmit(submitEvent);

    expect(router.navigateByUrl).toHaveBeenCalledWith(appRoutingPaths.courses);
  });
});
