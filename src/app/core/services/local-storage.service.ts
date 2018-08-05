import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class LocalStorageService {
  private storage: any;

  constructor(private windowRefService: WindowRefService) {
    this.storage = this.windowRefService.nativeWindow.localStorage;
  }

  getItem(keyName: string): any {
    return JSON.parse(this.storage.getItem(keyName));
  }

  setItem(keyName: string, keyValue: any) {
    this.storage.setItem(keyName, JSON.stringify(keyValue));
  }

  removeItem(keyName: string) {
    this.storage.removeItem(keyName);
  }

  clear() {
    this.storage.clear();
  }
}
