import {forwardRef, Inject, Injectable} from '@angular/core';
import {ExpenseService} from "./expense-data.service";
import {ExpenseService2} from "./expense.service";

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private expenseService: ExpenseService2) {
  }
  private static readonly USER_KEY = 'loggedUser';

  private currentUser: any; // Replace 'any' with your actual user object type

  setCurrentUser(user: any): void {
    this.currentUser = user;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
  getUser() {
    return JSON.parse(localStorage.getItem(UserDataService.USER_KEY) || '{}');
  }

  setUser(user: any) {
    // const storedExpenses = this.expenseService.getUserExpenses(); // Assuming getExpenses is defined in ExpenseService
    // user.expenses = storedExpenses;
    localStorage.setItem(UserDataService.USER_KEY, JSON.stringify(user));
  }

  getMonthlyBudget() {
    const user = this.getUser();
    return user.monthlyBudget || 0;
  }

  setMonthlyBudget(budget: number) {
    const user = this.getUser();
    user.monthlyBudget = budget;
    this.setUser(user);
  }




  updateUser(updatedUser) {
    const currentLoggedUser = this.getUser();

    if (currentLoggedUser) {
      // Update the user data
      const updatedUserData = {
        ...currentLoggedUser,
        ...updatedUser,
        expenses: updatedUser.expenses,
        avatar: updatedUser.avatar,
        userProfile:updatedUser.userProfile

      };

      // localStorage.setItem('loggedUser', JSON.stringify(updatedUserData));
      localStorage.setItem(UserDataService.USER_KEY, JSON.stringify(updatedUserData));
    }
  }

  // updateUserFile(updatedUserFile: any) {
  //   const currentLoggedUser = this.getUser();
  //
  //   if (currentLoggedUser) {
  //     // Update the user data
  //     const updatedUserData = {
  //       ...currentLoggedUser,
  //       avatar: updatedUserFile.avatar // Assuming 'avatar' is the field to store the image data
  //     };
  //
  //     localStorage.setItem(UserDataService.USER_KEY, JSON.stringify(updatedUserData));
  //   }
  // }

    getAdditionalInfo(email: string): any {
        const users = JSON.parse(localStorage.getItem('additional_info') || '{}');
        return users[email] && users[email].additionalInfo ? users[email].additionalInfo : {};
    }

    setAdditionalInfo(email: string, info: any): void {
        let users = JSON.parse(localStorage.getItem('additional_info') || '{}');
        users[email] = users[email] || {};
        users[email].additionalInfo = info;
        localStorage.setItem('additional_info', JSON.stringify(users));
    }

}
