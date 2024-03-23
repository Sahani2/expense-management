import {Component, EventEmitter, Output} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {SideNavComponent} from "../side-nav/side-nav.component";
import {SideNavButtonComponent} from "../side-nav-button/side-nav-button.component";
import {DashboardCardsComponent} from "../dashboard-cards/dashboard-cards.component";
import {TodayExpensesCardComponent} from "../today-expenses-card/today-expenses-card.component";
import {MonthlyExpensesCardComponent} from "../monthly-expenses-card/monthly-expenses-card.component";
import {MonthlyBudgetCardComponent} from "../monthly-budget-card/monthly-budget-card.component";
import {TotalExpensesCardComponent} from "../total-expenses-card/total-expenses-card.component";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule, HeaderComponent, RouterOutlet, SideNavComponent, DashboardCardsComponent, TodayExpensesCardComponent, MonthlyExpensesCardComponent, MonthlyBudgetCardComponent, TotalExpensesCardComponent
  ],
  templateUrl: './dashboard-layout.component.html',

})
export class DashboardLayoutComponent {
  sideNavCollapsed: boolean;
  @Output() isCollapsed = new EventEmitter<boolean>(true)
  @Output() onSideNavToggle: EventEmitter<boolean> = new EventEmitter<boolean>()
  protected readonly SideNavButtonComponent = SideNavButtonComponent;

  whenSideNavToggle() {
    this.sideNavCollapsed = !this.sideNavCollapsed;
    this.onSideNavToggle.emit(this.sideNavCollapsed);
  }
}
