import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';

import { of } from 'rxjs';

import { DialogService } from './dialog.service';

describe('DialogService', () => {
  class MatDialogStub {
    open = () => {};
  }

  let service;
  let matDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: MatDialog, useClass: MatDialogStub }
      ],
    });

    service = TestBed.get(DialogService);
    matDialogService = TestBed.get(MatDialog);

    spyOn(matDialogService, 'open').and.returnValue({
      componentInstance: { message: null },
      afterClosed: jasmine.createSpy(),
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open modal on confirm', () => {
    service.confirm('message');
    expect(matDialogService.open).toHaveBeenCalled();
  });
});
