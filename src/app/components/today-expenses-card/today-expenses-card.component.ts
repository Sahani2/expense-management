import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {ExpenseService2} from "../../services/expense.service";

@Component({
  selector: 'app-today-expenses-card',
  standalone: true,
    imports: [
        CurrencyPipe
    ],
  templateUrl: './today-expenses-card.component.html',
  styleUrl: './today-expenses-card.component.less'
})
export class TodayExpensesCardComponent implements OnInit{
  // create variable
  todayExpenses: any[] = [];
  totalTodayExpenses: number = 0;

  constructor(private expensesService: ExpenseService2) { }

  ngOnInit(): void {
    this.loadTodayExpenses();
  }
  loadTodayExpenses(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userEmail = loggedUser.email;

    const allExpenses = this.expensesService.getUserExpenses(userEmail);

    const currentDate = new Date();
    const currentDayExpenses = allExpenses.filter(
        (expense) => new Date(expense.date).toDateString() === currentDate.toDateString()
    );

    this.totalTodayExpenses = currentDayExpenses.reduce((sum, expense) => sum + expense.cost, 0);

  }
}
