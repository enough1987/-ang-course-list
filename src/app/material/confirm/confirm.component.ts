import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  // styleUrls: ['./confirm.component.sass']
})
export class ConfirmComponent {
  @Input() message: string;
  @Output() verdict: boolean;

  constructor(private dialog: MatDialog) {
    this.dialog.open(
      ConfirmDialogComponent
    );
  }
}

