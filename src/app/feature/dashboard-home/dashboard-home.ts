import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardLayoutComponent} from "../../components/dashboard-layout/dashboard-layout.component";
import {HeaderComponent} from "../../components/header/header.component";
import {SideNavComponent} from "../../components/side-nav/side-nav.component";
import {SideNavButtonComponent} from "../../components/side-nav-button/side-nav-button.component";
import {
  tuiIconCreditCard,
  tuiIconFilePlusLarge,
  tuiIconBarChart,
  tuiIconGrid,
  tuiIconUser,
  tuiIconFilePlus,
  tuiIconUsersLarge, tuiIconLogOut
} from "@taiga-ui/icons";
import {DashboardCardsComponent} from "../../components/dashboard-cards/dashboard-cards.component";
import {MonthlyBudgetCardComponent} from "../../components/monthly-budget-card/monthly-budget-card.component";
import {MonthlyExpensesCardComponent} from "../../components/monthly-expenses-card/monthly-expenses-card.component";
import {RouterOutlet} from "@angular/router";
import {TodayExpensesCardComponent} from "../../components/today-expenses-card/today-expenses-card.component";
import {TotalExpensesCardComponent} from "../../components/total-expenses-card/total-expenses-card.component";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent, HeaderComponent, SideNavComponent, SideNavButtonComponent, DashboardCardsComponent, MonthlyBudgetCardComponent, MonthlyExpensesCardComponent, RouterOutlet, TodayExpensesCardComponent, TotalExpensesCardComponent],
  templateUrl: './dashboard-home.html'
})
export class DashboardHome {
  @Input() sideNavCollapsed: boolean = true;
  @Input() isCollapsed = false;


  protected readonly tuiIconUsersLarge = tuiIconUsersLarge;
  protected readonly tuiIconBarChart = tuiIconBarChart;
  protected readonly tuiIconCreditCard = tuiIconCreditCard;
  protected readonly tuiIconGrid = tuiIconGrid;
  protected readonly tuiIconFilePlus = tuiIconFilePlus;
  protected readonly tuiIconLogOut = tuiIconLogOut;
}
