import {Component, OnInit} from '@angular/core';
import {TuiDialog} from "@taiga-ui/cdk";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.less'
})
export class ResetPasswordComponent implements OnInit {
  currentPassword: string;
  newPassword: string;

  constructor(private dialog: TuiDialog<any, any>) { }

  ngOnInit(): void {
  }

  onSaveClick(): void {
    // Close dialog and pass data back to parent component
    this.dialog.closeWith({ currentPassword: this.currentPassword, newPassword: this.newPassword });
  }

  onCancelClick(): void {
    this.dialog.close();
  }
}
