import { TestBed, inject } from '@angular/core/testing';

import { WindowRefService } from './window-ref.service';

describe('WindowRefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRefService]
    });
  });

  it('should be created', inject([WindowRefService], (service: WindowRefService) => {
    expect(service).toBeTruthy();
  }));

  it('should provide interface to native window', inject([WindowRefService], (service: WindowRefService) => {
    expect(service.nativeWindow).toEqual(window);
  }));
});
