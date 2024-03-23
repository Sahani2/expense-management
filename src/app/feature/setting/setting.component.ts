import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserDataService} from "../../services/user-data.service";
import {SignUp} from "../signup/signup.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {tuiIconClose} from "@taiga-ui/icons";
import {TuiSvgModule} from "@taiga-ui/core";

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    FormsModule, CommonModule, TuiSvgModule
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.less'
})
export class SettingComponent {

  userProfile: SignUp;
  currentPassword: string;
  newPassword: string;
  isFormVisible: boolean = false;
  constructor(private router: Router,  private userDataService: UserDataService) {}
  navigateToProfile() {
    this.router.navigateByUrl('/home/profile');

  }

  onLogout(){
    // localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('sign-in')
  }
  deleteAcc(){
    localStorage.removeItem('loggedUser');

  }
// password
  openPasswordForm() {
    // Show the password form
    this.isFormVisible = true;
  }
  closePasswordForm() {
    // Show the password form
    this.isFormVisible = false;
  }



  onSubmit() {
    if (!this.newPassword) {
      alert('New password cannot be empty');
      return;
    }

    // Retrieve logged-in user's information
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (!loggedUser || !loggedUser.email) {
      alert('Error: Unable to retrieve logged-in user information');
      return;
    }
    let users: SignUp[] = JSON.parse(localStorage.getItem('app_users') || '[]');

    const userToUpdateIndex = users.findIndex((user: SignUp) => user.email === loggedUser.email);

    if (userToUpdateIndex === -1) {
      alert('Error: Unable to find user in the user list');
      return;
    }

    users[userToUpdateIndex].password = this.newPassword;

    localStorage.setItem('app_users', JSON.stringify(users));

    loggedUser.password = this.newPassword;
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

    alert('Password updated successfully');

    this.currentPassword = '';
    this.newPassword = '';
    this.isFormVisible = false;
  }

  protected readonly tuiIconClose = tuiIconClose;
}

