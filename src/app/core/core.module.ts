import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowRefService, LocalStorageService } from './services';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    WindowRefService,
    LocalStorageService,
  ]
})
export class CoreModule { }
