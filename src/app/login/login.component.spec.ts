import { async, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of, Subscription } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../shared/services';
import { RouterStub } from '../testing/router-stubs';
import { appRoutingPaths } from '../app.routing.paths';


class AuthServiceStub {
  login = (): Observable<any> => of({ auth: true });
}

const submitEvent = {
  preventDefault: jasmine.createSpy('preventDefault', () => {}),
} as any;

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
    spyOn(service, 'login').and.callThrough();

    component.onSubmit(submitEvent);

    expect(service.login).toHaveBeenCalled();
  });

  it('should navigate to courses on successfull login', () => {
    spyOn(router, 'navigateByUrl').and.callThrough();

    component.onSubmit(submitEvent);

    expect(router.navigateByUrl).toHaveBeenCalledWith(appRoutingPaths.courses);
  });

  it('should do nothing if server login returned an invalid response', () => {
    spyOn(service, 'login').and.returnValue(of({}));
    spyOn(router, 'navigateByUrl');

    component.onSubmit(submitEvent);

    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    component.sub = new Subscription();
    spyOn(component.sub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });
});
