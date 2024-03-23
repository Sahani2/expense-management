// import {forwardRef, Inject, Injectable} from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import {UserDataService} from "./user-data.service";
//
// @Injectable({
//   providedIn: 'root',
// })
// // export class ExpenseService {
// //   private expenseDataSubject = new BehaviorSubject<any[]>([]);
// //   expenseData$: Observable<any[]> = this.expenseDataSubject.asObservable();
// //
// //     updateExpenseData(expenses: any[]): boolean {
// //         try {
// //             this.expenseDataSubject.next(expenses);
// //             return true;
// //         } catch (error) {
// //             console.error('Error updating expense data:', error);
// //             return false;
// //         }}
// // }
//
//
//
// export class ExpenseService {
//
//
//   private expensesSubject = new BehaviorSubject<any[]>([]);
//   expenses$ = this.expensesSubject.asObservable();
//
//   updateExpenses(expenses: any[]) {
//     this.expensesSubject.next(expenses);
//   }
//   addExpense(expense: any) {
//     const currentExpenses = this.expensesSubject.value;
//     const updatedExpenses = [...currentExpenses, expense];
//     this.expensesSubject.next(updatedExpenses);
//
//     // Persist the updated expenses to localStorage
//     // this.userDataService.updateUser({ expenses: updatedExpenses });
//   }
//
//   // Simulating asynchronous operation with a delay
//   private simulateAsyncOperation<T>(data: T): Observable<T> {
//     return new Observable(observer => {
//       setTimeout(() => {
//         observer.next(data);
//         observer.complete();
//       }, 500);
//     });
//   }
//
//   getExpenses(): Observable<any[]> {
//     // Simulate an asynchronous operation to fetch expenses
//     // return this.simulateAsyncOperation(this.expensesSubject.value);
//     const storedExpenses = JSON.parse(localStorage.getItem('loggedUser'))?.expenses || [];
//     this.expensesSubject.next(storedExpenses);
//     return this.expenses$;
//   }
//
// }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {constructor() {}

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
}

