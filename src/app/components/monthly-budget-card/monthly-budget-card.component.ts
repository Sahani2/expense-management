import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-monthly-budget-card',
  standalone: true,
    imports: [
        CurrencyPipe
    ],
  templateUrl: './monthly-budget-card.component.html',
  styleUrl: './monthly-budget-card.component.less'
})
export class MonthlyBudgetCardComponent implements OnInit{

  monthlyBudget: number = 0;

  constructor(private userDataService: UserDataService) {}


  ngOnInit() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (loggedUser) {
      this.monthlyBudget = loggedUser.monthlyBudget;
    }
  }

  setMonthlyBudget() {
    const loggedUser = this.userDataService.getUser();
    loggedUser.monthlyBudget = this.monthlyBudget;
    this.userDataService.setUser(loggedUser);
  }

}
