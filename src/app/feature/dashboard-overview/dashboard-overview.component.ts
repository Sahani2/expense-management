import {Component, OnInit} from '@angular/core';
import {TotalExpensesCardComponent} from "../../components/total-expenses-card/total-expenses-card.component";
import {MonthlyBudgetCardComponent} from "../../components/monthly-budget-card/monthly-budget-card.component";
import {TodayExpensesCardComponent} from "../../components/today-expenses-card/today-expenses-card.component";
import {MonthlyExpensesCardComponent} from "../../components/monthly-expenses-card/monthly-expenses-card.component";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {TuiPieChartModule, TuiRingChartModule} from "@taiga-ui/addon-charts";
import {tuiSum} from "@taiga-ui/cdk";
import {ExpenseService2} from "../../services/expense.service";

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
    imports: [
        TotalExpensesCardComponent,
        MonthlyBudgetCardComponent,
        TodayExpensesCardComponent,
        MonthlyExpensesCardComponent,
        CurrencyPipe,
        TuiRingChartModule,
        NgForOf,
        TuiPieChartModule
    ],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.less'
})
export class DashboardOverviewComponent {

  private readonly labels = ['Groceries', 'Health', 'Studies', 'Entertainment'];
  readonly value = [13769, 12367, 10172, 3018, 2592];
  readonly total = tuiSum(...this.value);

  index = NaN;

  get sum(): number {
    return Number.isNaN(this.index) ? this.total : this.value[this.index];
  }

  get label(): string {
    return Number.isNaN(this.index) ? 'Total' : this.labels[this.index];
  }


}

