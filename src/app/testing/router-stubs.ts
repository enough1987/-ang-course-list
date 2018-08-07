import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';

import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class RouterStub {
  public url;
  private subject = new Subject();
  public events = this.subject.asObservable();

  navigateByUrl(url: string) {
    this.url = url;
    this.triggerNavEvents(url);
  }

  triggerNavEvents(url) {
    const absUrl = url[0] === '/' ? url : `/${url}`;
    const ne = new NavigationEnd(0, absUrl, absUrl);
    this.subject.next(ne);
  }
}

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams: {};
  get testParams() { return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  get snapshot() {
    return { params: this.testParams };
  }
}
