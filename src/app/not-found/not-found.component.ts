import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // selector: 'app-not-found',    // no need for selector
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass']
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigateByUrl('/');
  }

}
