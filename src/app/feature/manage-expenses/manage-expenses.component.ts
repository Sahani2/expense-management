// import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
// import {TuiInputModule, TuiInputNumberModule, TuiTagModule} from "@taiga-ui/kit";
// import {TuiTableModule} from "@taiga-ui/addon-table";
// import {
//   TuiButtonModule,
//   tuiFormatNumber,
//   TuiFormatNumberPipeModule,
//   TuiTextfieldControllerModule
// } from "@taiga-ui/core";
// import {tuiIconTrash} from "@taiga-ui/icons";
// import {ExpenseService} from "../../services/expense-data.service";
// import {NgForOf, NgIf} from "@angular/common";
//
//
//
//
//
//   // readonly status: 'alive' | 'deceased';
//   // readonly tags: readonly string[];
//
// @Component({
//   selector: 'app-manage-expenses',
//   standalone: true,
//   imports: [
//     TuiTagModule, TuiTableModule, TuiTableModule, TuiButtonModule, TuiFormatNumberPipeModule, NgForOf, NgIf, TuiInputModule, TuiInputNumberModule, TuiTextfieldControllerModule
//   ],
//   templateUrl: './manage-expenses.component.html',
//   styleUrl: './manage-expenses.component.less',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ManageExpensesComponent {
//
//
//   constructor() {}
//   // ngOnInit() {
//   //   // Subscribe to the expenses observable
//   //   this.expenseService.expenses$.subscribe(expenses => {
//   //     // Use expenses to update your table data
//   //     this.data = expenses;
//   //   });
//   // }
//
//   data: any[] = [
//
//   ];
//
//   readonly columns = Object.keys(this.data[0]);
//
//   protected readonly tuiIconTrash = tuiIconTrash;
//
//
// }
import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {UserDataService} from "../../services/user-data.service";
import {ExpenseService} from "../../services/expense-data.service";
import {NgForOf, NgIf} from "@angular/common";
import {
  TuiAlertService,
  TuiButtonModule, TuiDialogService,
  TuiFormatNumberPipeModule,
  TuiHintModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiInputModule} from "@taiga-ui/kit";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {FormsModule} from "@angular/forms";
import { Subject } from 'rxjs';
import {tuiIconCheck, tuiIconEdit3, tuiIconSearch, tuiIconTrash} from "@taiga-ui/icons";
import {ExpenseService2} from "../../services/expense.service";
import {Router} from "@angular/router";
import {TUI_IS_IOS} from "@taiga-ui/cdk";

@Component({
  selector: 'app-manage-expenses',
  standalone: true,
  imports: [
    NgForOf,
    TuiFormatNumberPipeModule,
    TuiTableModule,
    TuiInputModule,
    FormsModule,
    NgIf,
    TuiTextfieldControllerModule,
    TuiHintModule,
    TuiButtonModule,
    TuiSvgModule,
  ], providers: [
    {
      provide: TUI_IS_IOS,
      useValue: false,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manage-expenses.component.html',
  styleUrl: './manage-expenses.component.less',
})
export class ManageExpensesComponent implements OnInit {
  expenses: any[] = [];
  searchTerm: string = '';
  filteredExpenses: any[] = [];
  constructor(
      @Inject(TuiAlertService) private readonly alert: TuiAlertService,
      private userDataService: UserDataService,
      private router: Router,
      private expenseService: ExpenseService2,
      private dialogService: TuiDialogService,

  ) {}

  private searchTermSubject = new Subject<string>();

  ngOnInit(): void {
    this.loadExpenses();
    this.watchSearchTerm();
  }
  watchSearchTerm() {
    this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged())
        .subscribe(() => {
          this.updateFilteredExpenses();
        });
  }

  getCurrentExpenses(): any[] {
    return this.searchTerm ? this.filteredExpenses || [] : this.expenses || [];
  }

  // Add a method to delete an expense
  deleteRow(expense: any): void {
    const currentExpenses = this.getCurrentExpenses();
    const index = currentExpenses.indexOf(expense);

    if (index !== -1) {
      currentExpenses.splice(index, 1);

      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      const userEmail = loggedUser.email;
      const userExpenses = this.expenseService.getUserExpenses(userEmail);
      const expenseIndex = userExpenses.findIndex(e => e.date === expense.date);

      if (expenseIndex !== -1) {
        userExpenses.splice(expenseIndex, 1);
        localStorage.setItem(`user-${userEmail}-expenses`, JSON.stringify(userExpenses));
      }
    }
  }

  updateSearchTerm(): void {
    // Filter expenses based on the search term
    this.filteredExpenses = this.expenses.filter((expense) =>
      expense.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      expense.cost.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      expense.date.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(this.searchTerm.toLowerCase())

    );
    this.getCurrentExpenses();
// new
    this.searchTermSubject.next(this.searchTerm);

  }

  loadExpenses() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userEmail = loggedUser.email;

    this.expenses = this.expenseService.getUserExpenses(userEmail);

    this.filteredExpenses = [...this.expenses];


  }


  filterExpenses() {
    this.filteredExpenses = this.expenses.filter((expense) =>
        this.matchSearchTerm(expense)
    );
  }

  matchSearchTerm(expense: any): boolean {
    const searchTerm = this.searchTerm.toLowerCase();
    const fieldsToSearch = ['date', 'description', 'category', 'cost'];
    for (const field of fieldsToSearch) {
      const fieldValue = expense[field].toString().toLowerCase();
      if (fieldValue.includes(searchTerm)) {
        return true;
      }
    }
    return false;
  }

  updateFilteredExpenses() {
    this.filteredExpenses = this.expenses.filter((expense) =>
        this.matchSearchTerm(expense)
    );
  }
  saveExpensesToLocalStorage(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userEmail = loggedUser.email;
    localStorage.setItem(`user-${userEmail}-expenses`, JSON.stringify(this.expenses));
  }
  // edit
  addnew() {
    const newExpense = {
      date: new Date().toISOString().slice(0, 10),
      description: '',
      category: 'Groceries',
      cost: 0,
    };
    this.expenses.push(newExpense);
    this.saveExpenses();
  }
  saveEdits(expense: any) {
    this.saveExpenses();
    this.alert
        .open('Changed the value successfully')
        .subscribe();
    expense.isEditing = false;
  }
  saveExpenses() {
    // localStorage.setItem('expenses', JSON.stringify(this.expenses));

    // const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    // const userEmail = loggedUser.email;
    // localStorage.setItem(`user-${userEmail}-expenses`, JSON.stringify(this.expenses));

    this.saveExpensesToLocalStorage();

  }
  // edit
  protected readonly tuiIconSearch = tuiIconSearch;

    navigateToAddnew() {
        this.router.navigateByUrl('/home/add-expenses');
    }

    protected readonly tuiIconEdit3 = tuiIconEdit3;
    protected readonly tuiIconTrash = tuiIconTrash;


  protected readonly tuiIconCheck = tuiIconCheck;
}
