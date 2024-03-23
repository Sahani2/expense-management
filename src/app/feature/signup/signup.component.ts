import { Component ,ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  Optional,
  Self,
  ViewChild, } from '@angular/core';
import {FormsModule,NgControl} from "@angular/forms";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { CommonModule } from '@angular/common';
import {UserDataService} from "../../services/user-data.service";
import {
  TUI_PASSWORD_TEXTS,
  TuiFieldErrorPipeModule,
  TuiInputPasswordModule,
  tuiInputPasswordOptionsProvider
} from "@taiga-ui/kit";
import {of} from "rxjs";
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiHintModule,
  TuiPrimitiveTextfieldComponent,
  TuiPrimitiveTextfieldModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {AbstractTuiControl, TuiNativeFocusableElement} from '@taiga-ui/cdk';
import {ExpenseService} from "../../services/expense-data.service";
import {ExpenseService2} from "../../services/expense.service";

@Component({
  selector: 'app-signup',
  standalone: true,

  imports: [
    FormsModule, CommonModule, RouterLink, RouterOutlet,
    TuiInputPasswordModule, TuiHintModule, TuiTextfieldControllerModule,
    TuiSvgModule, TuiPrimitiveTextfieldModule, TuiErrorModule, TuiFieldErrorPipeModule, TuiButtonModule
  ],

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.less',


  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent  {
  signUpObj1: { password: string } = { password: '' };
  passwordType: string = 'password';

  togglePasswordVisibility1(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }


  @ViewChild(TuiPrimitiveTextfieldComponent)
  private readonly textfield?: TuiPrimitiveTextfieldComponent;

  private isPasswordHidden = true;
  showSignUpForm: boolean = true;
// isSignDivVisible: boolean = false;
  signUpObj: SignUp =  new SignUp();
  signInObj: SignIn =  new SignIn();



  constructor(private router: Router, private userDataService: UserDataService, private expenseService: ExpenseService2,
  ) {

  }


  onRegister(){


    const localUsers = localStorage.getItem('app_users');
    const users = localUsers ? JSON.parse(localUsers) : [];

    const existingUser = users.find((user: SignUp) => user.email === this.signUpObj.email);

if (this.signUpObj.name.trim() !== '' && this.signUpObj.email.trim() !== '' && this.signUpObj.password.trim() !== '' && this.signUpObj.date.trim() !== '') {

  if (existingUser) {
      alert('User with this email already exists. Please sign in.');
    } else {
      this.signUpObj.monthlyBudget = 0; // Set the initial monthly budget
      users.push(this.signUpObj);
      localStorage.setItem('app_users', JSON.stringify(users));
    localStorage.setItem(`user-${this.signUpObj.email}-monthlyBudget`, '0');
    localStorage.setItem('loggedUser', JSON.stringify(this.signUpObj));
      this.userDataService.setUser(this.signUpObj);

      alert('Successful sign up');
      this.toggleForms();
    }}else {
  alert('Please fill in all fields');
}
  }
  onSignIn(){
    // read the saved data
    const localUsers = localStorage.getItem('app_users');
    // user type krpu eka lsorage eke tiyeida ndda check krnwa
    if (localUsers != null){
      const users= JSON.parse(localUsers);
      const isUserActive = users.find((user:SignUp)=> user.email == this.signInObj.email && user.password == this.signInObj.password);

      if (isUserActive != undefined){
        alert("logged in successfully");

        const monthlyBudget = localStorage.getItem(`user-${isUserActive.email}-monthlyBudget`) || '0';
        const loggedUserWithBudget = {
          ...isUserActive,

          monthlyBudget: +monthlyBudget,
        };
        localStorage.setItem('loggedUser', JSON.stringify(loggedUserWithBudget));


        this.router.navigateByUrl('home');
      }

      else {
        alert("the email or password is not matched")
      }
    }

  }

  toggleForms(): void {
    this.showSignUpForm = !this.showSignUpForm;
  }

  protected readonly SignUp = SignUp;
}
export class SignUp{
  name:string;
  email:string;
  password:string;
  date: string;
  monthlyBudget?:number;
  expenses:
      [{date: "", description: "", category: "", cost: 0, file: null}];

  constructor() {
    this.name="";
    this.email="";
    this.password="";
    this.date="";
    // this.monthlyBudget="";
    this.monthlyBudget = undefined;
    this.expenses=
        [{date: "", description: "", category: "", cost: 0, file: null}];


  }
}
export class SignIn{

  email:string;
  password:string;

  constructor() {
    this.email="";
    this.password="";
  }
}
