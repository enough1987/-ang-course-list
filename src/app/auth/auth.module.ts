import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: [AuthService],
})
export class AuthModule {}
