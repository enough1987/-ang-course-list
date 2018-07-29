import { Injectable } from '@angular/core';
import { convertToParamMap, ParamMap, Params } from '@angular/router';

import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class RouterStub {
  navigate() { }
  navigateByUrl(url: string) { return url; }
}

// @Injectable()
// export class ActivatedRouteStub {
//   private subject = new BehaviorSubject(this.testParams);
//   private _testParams: {};

//   paramMap = this.subject.asObservable();

//   get testParams() { return this._testParams; }
//   set testParams(paramMap: {}) {
//     this._testParams = paramMap;
//     this.subject.next(paramMap);
//   }

//   get params(): Observable<Params> {
//     return this.paramMap;
//   }

//   get snapshot() {
//     return { paramMap: this.testParams };
//   }
// }

// export class ActivatedRouteStub {
//   // Use a ReplaySubject to share previous values with subscribers
//   // and pump new values into the `paramMap` observable
//   private subject = new ReplaySubject<ParamMap>();

//   /** The mock paramMap observable */
//   readonly paramMap = this.subject.asObservable();

//   get params() {
//     return this.paramMap;
//   }

//   /** Set the paramMap observables's next value */
//   setParamMap(params?: Params) {
//     this.subject.next(convertToParamMap(params));
//   }
// }

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
