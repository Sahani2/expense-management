import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {TuiAvatarModule, TuiBadgedContentModule, TuiInputDateModule, TuiInputPhoneModule} from "@taiga-ui/kit";
import {UserDataService} from "../../services/user-data.service";
import {
  tuiIconBellLarge,
  tuiIconCamera,
  tuiIconCameraLarge,
  tuiIconCameraOffOutline,
  tuiIconCameraOutline, tuiIconCheck, tuiIconClose, tuiIconEdit, tuiIconEdit2,
  tuiIconTrash
} from "@taiga-ui/icons";
import {TuiAlertService, TuiSvgModule} from "@taiga-ui/core";
import {FormControl, FormGroup, FormsModule} from "@angular/forms";
import {SignUp} from "../signup/signup.component";
import {AdditionalInfoService} from "../../services/AdditionalInfo.service";

@Component({
  selector: 'app-profile-edit',
  standalone: true,
    imports: [
        NgIf,
        RouterOutlet,
        TuiAvatarModule,
        TuiSvgModule,
        TuiBadgedContentModule,
        FormsModule,
        TuiInputDateModule,
        TuiInputPhoneModule,
        NgForOf
    ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.less'
})
export class ProfileEditComponent implements OnInit{
  editMode: boolean = false;
  loggedUser: any;
// profil
  userImage: string | ArrayBuffer | null = null;
  userProfile:SignUp;
  currentPassword: string ;
  newPassword: string;
    additionalInfo: any;

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.currentPassword = '';
    }

    // this.currentPassword = '';
  }

  ngOnInit(): void {
    const localUser = localStorage.getItem('loggedUser');
    if (localUser != null) {
      this.userProfile = JSON.parse(localUser);
    }

    const user = this.userDataService.getUser();
    if (user && user.avatar) {
      this.userImage = user.avatar;
    } else if (localStorage.getItem('userImage')) {
      this.userImage = localStorage.getItem('userImage');
    }

    this.loadAdditionalInfo();
  }
  loadAdditionalInfo(): void {
    // const userEmail = this.userDataService.getCurrentUser().email;
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userEmail = loggedUser.email;
    this.additionalInfo = this.userDataService.getAdditionalInfo(userEmail);
  }
  // Function to handle file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.updateUserWithAvatar(file);
    }
  }

  updateUserWithAvatar(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      const updatedUser = {
        ...this.userDataService.getUser(),
        avatar: imageData
      };
      this.userDataService.updateUser(updatedUser);
      this.userImage = imageData;
      localStorage.setItem('userImage', imageData);
    };
    reader.readAsDataURL(file);
  }
// profile
  // userProfile: any;
  constructor(
      @Inject(TuiAlertService) private readonly alert: TuiAlertService, private additionalInfoService: AdditionalInfoService, private router: Router, private userDataService: UserDataService) {

    const  localUser = localStorage.getItem('loggedUser');
    if (localUser != null){
      this.userProfile = JSON.parse(localUser);
    }


  }



  screenSize: 'small' | 'medium' | 'large' = 'large';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateScreenSize();
  }

  private updateScreenSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      this.screenSize = 'small';
    } else if (screenWidth < 992) {
      this.screenSize = 'medium';
    } else {
      this.screenSize = 'large';
    }
  }


  protected readonly tuiIconTrash = tuiIconTrash;
  protected readonly tuiIconCameraOutline = tuiIconCameraOutline;
  protected readonly tuiIconCamera = tuiIconCamera;
  protected readonly tuiIconCameraLarge = tuiIconCameraLarge;
  protected readonly tuiIconCameraOffOutline = tuiIconCameraOffOutline;
  protected readonly tuiIconBellLarge = tuiIconBellLarge;
  protected readonly tuiIconEdit2 = tuiIconEdit2;
  protected readonly tuiIconEdit = tuiIconEdit;
  protected readonly tuiIconCheck = tuiIconCheck;

  // edit
  saveChanges() {

    if (this.newPassword) {
      // Validate current password only if a new password is provided
      if (this.currentPassword === this.userProfile.password) {
        this.userProfile.password = this.newPassword;


        const userEmail = this.userProfile.email;
        const localUsers = localStorage.getItem('app_users');
        const users = localUsers ? JSON.parse(localUsers) : [];
        const userToUpdateIndex = users.findIndex((user: SignUp) => user.email === userEmail);
        if (userToUpdateIndex !== -1) {
          users[userToUpdateIndex].password = this.newPassword;
          localStorage.setItem('app_users', JSON.stringify(users));


      } else {
        alert('Incorrect current password');
        return;
      }
    }

   // update the app-user


// update the logggeduser
      localStorage.setItem('loggedUser', JSON.stringify(this.userProfile));
      this.alert
          .open('Profile updated successfully')
          .subscribe();
      this.toggleEditMode();
    }


  }




  saveAdditionalInfo(): void {
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const telephone = (document.getElementById('telephone') as HTMLInputElement).value;
    const profession = (document.getElementById('profession') as HTMLInputElement).value;
    const companyName = (document.getElementById('companyName') as HTMLInputElement).value;
    const companyAddress = (document.getElementById('companyAddress') as HTMLInputElement).value;

    // const userEmail = this.userDataService.getCurrentUser().email;
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userEmail = loggedUser.email;
    this.userDataService.setAdditionalInfo(userEmail, {
      address: address,
      telephone: telephone,
      profession: profession,
      companyName: companyName,
      companyAddress: companyAddress
    });

    this.alert
        .open('Additional info saved')
        .subscribe();
    this.toggleEditMode();
  }


  protected readonly tuiIconClose = tuiIconClose;
  protected readonly localStorage = localStorage;


}
