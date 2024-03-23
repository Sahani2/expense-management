import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserDataService} from "../../services/user-data.service";
import {ExpenseService} from "../../services/expense-data.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {
  TuiButtonModule, TuiDialogService,
  TuiFormatNumberPipeModule,
  TuiHintModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiInputDateModule, TuiInputDateRangeModule, TuiInputModule} from "@taiga-ui/kit";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { Subject } from 'rxjs';
import {tuiIconEdit3, tuiIconSearch, tuiIconTrash} from "@taiga-ui/icons";
import {ExpenseService2} from "../../services/expense.service";
import {Router} from "@angular/router";
import {TUI_IS_IOS, TuiDay, TuiDayRange, tuiSum} from "@taiga-ui/cdk";
import { TuiRingChartModule } from '@taiga-ui/addon-charts';







@Component({
  selector: 'app-report-expenses',
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
    TuiInputDateRangeModule,
    ReactiveFormsModule,
    TuiRingChartModule,
    CurrencyPipe,
    TuiInputDateModule,
  ], providers: [
    {
      provide: TUI_IS_IOS,
      useValue: false,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './report-expenses.component.html',
  styleUrl: './report-expenses.component.less'
})
export class ReportExpensesComponent implements OnInit{
  expenses: any[] = [];
  searchTerm: string = '';
    filteredExpenses: any[] = [];

  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private expenseService: ExpenseService2,
    private dialogService: TuiDialogService,

  ) {

  }



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
  protected readonly tuiIconSearch = tuiIconSearch;

  addnew() {
    this.router.navigateByUrl('/home/add-expenses');
  }

  protected readonly tuiIconEdit3 = tuiIconEdit3;
  protected readonly tuiIconTrash = tuiIconTrash;




    // chart
    private readonly labels = ['Groceries', 'Health', 'Studies', 'Entertainment'];
    readonly value = [13769, 12367, 10172, 3018, ];
    readonly total = tuiSum(...this.value);

    index = NaN;

    get sum(): number {
        return Number.isNaN(this.index) ? this.total : this.value[this.index];
    }

    get label(): string {
        return Number.isNaN(this.index) ? 'Total' : this.labels[this.index];
    }


    // date range
  dateRangeForm: FormGroup;
}
