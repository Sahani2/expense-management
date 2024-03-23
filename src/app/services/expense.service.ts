import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService2 {
  constructor() {}

  saveExpense(userEmail: string, expense: any): void {
    const userExpenses = this.getUserExpenses(userEmail);
    userExpenses.push(expense);
    localStorage.setItem(`user-${userEmail}-expenses`, JSON.stringify(userExpenses));
  }

  getUserExpenses(userEmail: string): any[] {
    try {
      const userExpensesString = localStorage.getItem(`user-${userEmail}-expenses`);
      return userExpensesString ? JSON.parse(userExpensesString) : [];
    } catch (error) {
      console.error('Error parsing user expenses:', error);
      return [];
    }
  }


  // chart
  private readonly labels = ['Groceries', 'Entertainment', 'Studies', 'Health'];



  // Other methods...


  // delete
  deleteExpense(userEmail: string, expenseId: number): void {
    const userExpenses = this.getUserExpenses(userEmail);
    const updatedUserExpenses = userExpenses.filter(expense => expense.id !== expenseId);
    localStorage.setItem(`user-${userEmail}-expenses`, JSON.stringify(updatedUserExpenses));
  }
}
