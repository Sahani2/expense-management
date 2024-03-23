import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ExpenseService2} from "../services/expense.service";
import {TuiRingChartModule} from "@taiga-ui/addon-charts";
import {tuiSum} from "@taiga-ui/cdk";


@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TuiRingChartModule],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.less'
})
export class FeatureComponent implements OnInit{
  //  readonly labels = ['Groceries', 'Health', 'Studies', 'Entertainment'];
  // readonly value = [0, 0, 0, 0];
  // readonly total = tuiSum(...this.value);
  //
  // index = NaN;
  //
  // get sum(): number {
  //   return Number.isNaN(this.index) ? this.total : this.value[this.index];
  // }
  //
  // get label(): string {
  //   return Number.isNaN(this.index) ? 'Total' : this.labels[this.index];
  // }
  //
  // constructor(private expenseService: ExpenseService2) {
  //   const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  //   const userEmail = loggedUser ? loggedUser.email : '';
  //   if (userEmail) {
  //     const userExpenses = this.expenseService.getUserExpenses(userEmail);
  //     const currentMonthExpenses = userExpenses.filter(expense => {
  //       const expenseDate = new Date(expense.date);
  //       return expenseDate.getMonth() === new Date().getMonth();
  //     });
  //     currentMonthExpenses.forEach((expense, index) => {
  //       if (expense.category === 'Groceries') {
  //         this.value[0] += expense.amount;
  //       } else if (expense.category === 'Health') {
  //         this.value[1] += expense.amount;
  //       } else if (expense.category === 'Studies') {
  //         this.value[2] += expense.amount;
  //       } else if (expense.category === 'Entertainment') {
  //         this.value[3] += expense.amount;
  //       }
  //     });
  //   }
  // }
  currentMonthExpenses: number[];
  labels: string[] = ['Groceries', 'Health', 'Studies', 'Entertainment'];
  total: number;

  index = NaN;

  // Chart data
  chartData: { name: string; value: number; color: string; startAngle: number; angle: number }[] = [];

  constructor(private expenseService: ExpenseService2) { }

  ngOnInit(): void {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      const userEmail = loggedUser.email;
    // Call the service method to get current month expenses
    this.currentMonthExpenses = this.expenseService.getCurrentMonthExpenses(userEmail);

    // Calculate total expense for the current month
    this.total = this.calculateTotal(this.currentMonthExpenses);

    // Generate data for the chart
    this.generateChartData();
  }

  calculateTotal(expenses: number[]): number {
    return expenses.reduce((acc, val) => acc + val, 0);
  }

  generateChartData(): void {
    const colors = ['#FFA726', '#EF5350', '#66BB6A', '#29B6F6']; // Example colors

    let totalValue = 0;
    this.currentMonthExpenses.forEach(value => totalValue += value);

    let startAngle = 0;
    for (let i = 0; i < this.labels.length; i++) {
      const angle = (this.currentMonthExpenses[i] / totalValue) * 360;
      this.chartData.push({
        name: this.labels[i],
        value: this.currentMonthExpenses[i], // Assign the value here
        color: colors[i % colors.length], // Ensure we have a color for each label
        startAngle,
        angle
      });
      startAngle += angle;
    }
  }

  get sum(): number {
    return Number.isNaN(this.index) ? this.total : this.currentMonthExpenses[this.index];
  }

  get label(): string {
    return Number.isNaN(this.index) ? 'Total' : this.labels[this.index];
  }



  protected readonly localStorage = localStorage;
}
