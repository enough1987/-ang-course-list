import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { WindowRefService, LocalStorageService, config, ConfigService } from './services';
import { AuthInterceptor } from './interceptors';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    WindowRefService,
    LocalStorageService,
    { provide: ConfigService, useValue: config },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class CoreModule { }
