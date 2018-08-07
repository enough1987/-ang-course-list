import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NotFoundComponent } from './not-found.component';
import { RouterStub } from '../testing/router-stubs';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      imports: [
        MaterialModule,   // material is used in the template
        FormsModule,      // ngModel is used in the template
      ],
      providers: [
        NotFoundComponent,
        { provide: Router, useClass: RouterStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(NotFoundComponent);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router on go home', () => {
    spyOn(router, 'navigateByUrl');
    component.goHome();
    expect(router.navigateByUrl).toHaveBeenCalledWith('');
  });
});
