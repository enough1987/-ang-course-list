import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { WindowRefService } from './window-ref.service';

describe('LocalStorageService', () => {
  let service;
  let windowRefServiceSpy;

  beforeEach(() => {
    const spy = {
      nativeWindow: {
        localStorage: jasmine.createSpyObj('localStorage', {
          getItem: JSON.stringify({ id: 1, firstName: 'Name', lastName: 'Last' }),
          setItem: null,
          removeItem: null,
          clear: null,
        }),
      }
    };

    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        { provide: WindowRefService, useValue: spy }
      ]
    });

    service = TestBed.get(LocalStorageService);
    windowRefServiceSpy = TestBed.get(WindowRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call native window localStorage on get item', () => {
    service.getItem('name');
    expect(windowRefServiceSpy.nativeWindow.localStorage.getItem)
      .toHaveBeenCalledWith('name');
  });

  it('should call native window localStorage on set item', () => {
    service.setItem('name', 'value');
    expect(windowRefServiceSpy.nativeWindow.localStorage.setItem)
      .toHaveBeenCalledWith('name', JSON.stringify('value'));
  });

  it('should call native window localStorage on remove item', () => {
    service.removeItem('name');
    expect(windowRefServiceSpy.nativeWindow.localStorage.removeItem)
      .toHaveBeenCalledWith('name');
  });

  it('should call native window localStorage on clear', () => {
    service.clear();
    expect(windowRefServiceSpy.nativeWindow.localStorage.clear)
      .toHaveBeenCalled();
  });
});
