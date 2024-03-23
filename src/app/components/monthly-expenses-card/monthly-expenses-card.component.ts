import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {ExpenseService2} from "../../services/expense.service";

@Component({
  selector: 'app-monthly-expenses-card',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './monthly-expenses-card.component.html',
  styleUrl: './monthly-expenses-card.component.less'
})
export class MonthlyExpensesCardComponent implements OnInit{
  monthlyExpenses: number = 0;

  constructor(private expenseService: ExpenseService2) {}

  ngOnInit(): void {
    this.loadMonthlyExpenses();
  }

  loadMonthlyExpenses(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userEmail = loggedUser.email;

    const allExpenses = this.expenseService.getUserExpenses(userEmail);

    const currentDate = new Date();
    const currentMonthExpenses = allExpenses.filter(
        (expense) => new Date(expense.date).getMonth() === currentDate.getMonth()
    );

    // Calculate the total sum of expenses
    this.monthlyExpenses = currentMonthExpenses.reduce((sum, expense) => sum + expense.cost, 0);
  }
}
