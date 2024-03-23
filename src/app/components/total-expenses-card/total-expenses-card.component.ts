import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {ExpenseService2} from "../../services/expense.service";

@Component({
  selector: 'app-total-expenses-card',
  standalone: true,
    imports: [
        CurrencyPipe
    ],
  templateUrl: './total-expenses-card.component.html',
  styleUrl: './total-expenses-card.component.less'
})
export class TotalExpensesCardComponent implements OnInit{
  totalExpenses: number = 0;

  constructor(private expenseService: ExpenseService2) {}

  ngOnInit(): void {
    this.loadTotalExpenses();
  }

  loadTotalExpenses(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userEmail = loggedUser.email;

    const allExpenses = this.expenseService.getUserExpenses(userEmail);

    this.totalExpenses = allExpenses.reduce((sum, expense) => sum + expense.cost, 0);
  }

}
