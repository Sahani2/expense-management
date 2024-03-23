import {ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TuiRootModule, TuiSvgModule,} from "@taiga-ui/core";
import {TuiAvatarModule, TuiBadgedContentModule,} from "@taiga-ui/kit";
import {Router, RouterOutlet, RouterLink} from "@angular/router";
import {tuiIconBellLarge, tuiIconLogOut, tuiIconMenu, tuiIconSearch, tuiIconSettingsLarge,tuiIconUserLarge} from "@taiga-ui/icons";
import {UserDataService} from "../../services/user-data.service";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TuiSvgModule, TuiAvatarModule, RouterOutlet, TuiRootModule, RouterLink, TuiBadgedContentModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  sideNavCollapsed = false;
  //
  // sideNavToggle() {
  //   this.sideNavCollapsed = !this.sideNavCollapsed;
  // }
  @Output()
  public sideNavToggle = new EventEmitter<boolean>(true)

  public searchBar = new EventEmitter<string>();

  public notifications = new EventEmitter<number>();
  public settingsUpdate = new EventEmitter<any>();

  protected readonly tuiIconMenu = tuiIconMenu;

  protected readonly tuiIconSearch = tuiIconSearch;
  protected readonly tuiIconBellLarge = tuiIconBellLarge;
  protected readonly tuiIconSettingsLarge = tuiIconSettingsLarge;
  protected readonly tuiIconLogOut1 = tuiIconLogOut;
  protected readonly tuiIconUserLarge=tuiIconUserLarge;


  loggedUser: any;
  constructor(private router: Router,  private userDataService: UserDataService) {
    const  localUser = localStorage.getItem('loggedUser');
    if (localUser != null){
this.loggedUser = JSON.parse(localUser);
    }
  }
  onLogout(){
    // localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('sign-in')
  }
  navigateToProfile(){
    // this.router.navigate(['/home/profile']);

    this.router.navigateByUrl('/home/profile');

  }

  protected readonly tuiIconLogOut = tuiIconLogOut;
  // path: string= '/assets/today-expenses.png';


  // readonly userimage = 'assets/today-expenses.png';
  // userimage: string | null = '';


  userImage: string | ArrayBuffer | null = null;
  userProfile = { name: 'User' ,email:'',password:'',date:''};



  ngOnInit(): void {
    const user = this.userDataService.getUser();
    // if (user && user.avatar) {
    //   this.userImage = user.avatar;
    // }
    if (user && user.avatar) {
      this.userImage = user.avatar;
    } else if (localStorage.getItem('userImage')) {
      this.userImage = localStorage.getItem('userImage');
    }
  }

  // Function to handle file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.updateUserWithAvatar(file);
    }
  }

  // Function to update user data with the uploaded image
  updateUserWithAvatar(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string; // Convert the result to a string
      const updatedUser = {
        ...this.userDataService.getUser(),
        avatar: imageData // Store the image data in the user object
      };
      this.userDataService.updateUser(updatedUser);
      this.userImage = imageData; // Update the image in the component
      localStorage.setItem('userImage', imageData); // Update the image in the component
    };
    reader.readAsDataURL(file);
  }

  navigateToSettings() {
    this.router.navigateByUrl('/home/settings');

  }
}
