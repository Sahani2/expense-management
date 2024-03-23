// import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
// import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
// import {TuiComboBoxModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFileLike, TuiFilterByInputPipeModule, TuiInputDateModule, tuiInputDateOptionsProvider, TuiInputFilesModule,
//   TuiInputNumberModule, TuiMarkerIconModule, TuiStringifyContentPipeModule, TuiTextareaModule} from "@taiga-ui/kit";
// import {
//   TuiAlertService,
//   TuiButtonModule,
//   TuiErrorModule,
//   TuiLinkModule,
//   TuiSvgModule,
//   TuiTextfieldControllerModule
// } from "@taiga-ui/core";
// import {TuiControlModule, TuiDay} from "@taiga-ui/cdk";
// import {async} from "rxjs";
// import {AsyncPipe, CommonModule} from "@angular/common";
// import {tuiIconUploadCloudLarge} from "@taiga-ui/icons";
// import {UserDataService} from "../../services/user-data.service";
// import {ExpenseService} from "../../services/expense-data.service";
//
//
//
//
//
// @Component({
//   selector: 'app-add-expenses',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule, TuiInputDateModule, TuiTextfieldControllerModule, TuiErrorModule, TuiFieldErrorPipeModule, AsyncPipe, TuiTextareaModule, TuiStringifyContentPipeModule, TuiDataListWrapperModule, TuiFilterByInputPipeModule,
//     TuiComboBoxModule, TuiInputNumberModule, TuiMarkerIconModule, TuiInputFilesModule, TuiLinkModule, TuiControlModule, TuiSvgModule, CommonModule, TuiButtonModule
//   ],
//   templateUrl: './add-expenses.component.html',
//   // styleUrls:['src/app/feature/add-expenses/add-expenses.component.less ','src/styles.less'] ,
//   styleUrl: './add-expenses.component.less',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   providers: [tuiInputDateOptionsProvider({nativePicker: true})],
// })
// export class AddExpensesComponent {
//
//   AddExpensesObj: AddExpenses = new AddExpenses();
//   readonly file = new FormControl();
//   readonly Date = new FormControl();
//   readonly description = new FormControl();
//   readonly cost = new FormControl();
//   readonly category = new FormControl();
//
//   currentDate = TuiDay.currentUtc();
//   selectedFileName: string | null = null;
//
//   constructor(@Inject(TuiAlertService) private readonly alert: TuiAlertService, private cdr: ChangeDetectorRef, private userDataService: UserDataService,private expenseService: ExpenseService) {}
//
//   onFileChange(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     const files = inputElement.files;
//
//     if (files && files.length > 0) {
//       this.selectedFileName = files[0].name;
//
//       const fileData = {
//         name: this.selectedFileName,
//
//       };
//       // Save fileData in local storage
//       localStorage.setItem('fileData', JSON.stringify(fileData));
//     } else {
//       this.selectedFileName = null;
//     }
//
//     // Trigger change detection to update the view
//     this.cdr.detectChanges();
//   }
//
//
//   protected readonly tuiIconMenu = tuiIconUploadCloudLarge;
//   readonly AddExpenses = new FormGroup({
//     Date: new FormControl(this.currentDate, Validators.required),
//     description: new FormControl('', Validators.required),
//     file:new FormControl(this.selectedFileName, Validators.required),
//     cost: new FormControl(Validators.required),
//     category: new FormControl( Validators.required),
//   });
//
//
//   readonly items = [
//     {name: 'Groceries'},
//     {name: 'Entertainment'},
//     {name: 'Studies'},
//     {name: 'Health'},
//
//   ];
//
//   // set the string values for dropdown
//   readonly stringify = (item: {name: string; }): string =>
//     `${item.name} `;
//
//
//
//
//   protected readonly async = async;
//
//   protected readonly FormControl = FormControl;
//
//   protected readonly tuiIconUploadCloudLarge = tuiIconUploadCloudLarge;
//
//   onSubmit() {
//     // Assuming you have a service to get the currently logged-in user
//     const loggedUser = this.userDataService.getUser();
//
//     // Check if the user is logged in
//     if (!loggedUser) {
//       alert('User not logged in. Please sign in.');
//       return;
//     }
//     if (this.AddExpensesObj.Date.trim() !== '' && this.AddExpensesObj.cost.trim() !== '' && this.AddExpensesObj.category.trim()) {
//
//       // Get expense details from the form
//       const expenseDetails = this.AddExpenses.value;
//       expenseDetails.category = this.category.value;
//       expenseDetails.file=this.selectedFileName;
//
//       // Get the user's existing expenses from local storage
//       const userExpenses = JSON.parse(localStorage.getItem(`user-${loggedUser.email}-expenses`) || '[]');
//
//       // Add the new expense to the list
//       userExpenses.push(expenseDetails);
//
//       // Save the updated expenses list back to local storage
//       localStorage.setItem(`user-${loggedUser.email}-expenses`, JSON.stringify(userExpenses));
//       this.alert.open('Successfully added the expense').subscribe();
//     }else {
//       alert('Fill the mandatory fields');
//     }
//   }
//
//
//
//
// }
// export class AddExpenses{
//   Date:string;
//   description?:string;
//   cost:string;
//   category: string;
//
//   constructor() {
//     this.Date="";
//     this.description="";
//     this.cost="";
//     this.category="";
//     // this.monthlyBudget="";
//     // this.monthlyBudget = undefined;
//   }}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiComboBoxModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFileLike, TuiFilterByInputPipeModule, TuiInputDateModule, tuiInputDateOptionsProvider, TuiInputFilesModule,
  TuiInputNumberModule, TuiMarkerIconModule, TuiStringifyContentPipeModule, TuiTextareaModule} from "@taiga-ui/kit";
import {
  TuiAlertService,
  TuiButtonModule,
  TuiErrorModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiTextfieldControllerModule, TuiTextfieldSizeDirective
} from "@taiga-ui/core";
import {TuiControlModule, TuiDay} from "@taiga-ui/cdk";
import {async, take} from "rxjs";
import {AsyncPipe, CommonModule} from "@angular/common";
import {tuiIconUploadCloudLarge} from "@taiga-ui/icons";
import {UserDataService} from "../../services/user-data.service";
import {stringify} from "postcss";
import {ExpenseService} from "../../services/expense-data.service";
import {ExpenseService2} from "../../services/expense.service";

@Component({
  selector: 'app-add-expenses',
  standalone: true,
  imports: [
    ReactiveFormsModule, TuiInputDateModule, TuiTextfieldControllerModule, TuiErrorModule, TuiFieldErrorPipeModule, AsyncPipe, TuiTextareaModule, TuiStringifyContentPipeModule, TuiDataListWrapperModule, TuiFilterByInputPipeModule,
    TuiComboBoxModule, TuiInputNumberModule, TuiMarkerIconModule, TuiInputFilesModule, TuiLinkModule, TuiControlModule, TuiSvgModule, CommonModule, TuiButtonModule
  ],

  styleUrl: './add-expenses.component.less',
  templateUrl: './add-expenses.component.html',
//   // styleUrls:['src/app/feature/add-expenses/add-expenses.component.less ','src/styles.less'] ,
//   styleUrl: './add-expenses.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiInputDateOptionsProvider({nativePicker: true})],
})
export class AddExpensesComponent implements OnInit{
  currentDate = TuiDay.currentUtc();
  selectedFileName: string | null = null;
  AddExpenses: FormGroup;
  category: FormControl;
  file: FormControl;

  items: string[] = ['Groceries', 'Entertainment', 'Studies', 'Health'];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService2,
    private userDataService: UserDataService,@Inject(TuiAlertService) private readonly alert: TuiAlertService,
  ) {}

  ngOnInit(): void {
    this.category = new FormControl('');
    this.file = new FormControl(null);

    this.AddExpenses = this.fb.group({
      date: [this.currentDate, Validators.required],
      description: ['', Validators.required],
      category: this.category,
      cost: [ Validators.required],
      file: this.file,

    });
  }


  stringify = (value: string): string => value;


  onSubmit() {
    const formData = this.AddExpenses.value;
    const loggedUser = this.userDataService.getUser();

    if (loggedUser) {
      if (!formData.date || !formData.category || !formData.cost) {
        let missingFields = [];
        if (!formData.date) {
          missingFields.push('Date');
        }
        if (!formData.category) {
          missingFields.push('Category');
        }
        if (!formData.cost) {
          missingFields.push('Cost');
        }
        alert(`Please fill in the ${missingFields.join(' , ')}`);
        return;
      }

      const expensesData = {
        date: formData.date,
        description: formData.description,
        category: formData.category,
        cost: formData.cost,
      };

      if (formData.file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {

          localStorage.setItem('uploadedFile', fileReader.result as string);
          expensesData['file'] = formData.file.name;
          this.expenseService.saveExpense(loggedUser.email, expensesData);

          this.alert
              .open('Expense saved successfully')
              .subscribe();
        };
        fileReader.readAsDataURL(formData.file);
      } else {
        this.expenseService.saveExpense(loggedUser.email, expensesData);
        this.alert
            .open('Expense saved successfully')
            .subscribe();
      }
    } else {


      this.alert
          .open('User not logged in. Please sign in.')
          .subscribe();
    }}
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      this.selectedFileName = files[0].name;
      this.file.setValue(files[0]);
    } else {
      this.selectedFileName = null;
      this.file.setValue(null);
    }
  }


  protected readonly tuiIconUploadCloudLarge = tuiIconUploadCloudLarge;
}
