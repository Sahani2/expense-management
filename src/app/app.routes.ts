import { Routes } from '@angular/router';
import {AuthPageComponent} from "./feature/auth/auth-page/auth-page.component";
import {DashboardHome} from "./feature/dashboard-home/dashboard-home";
import {DashboardOverviewComponent} from "./feature/dashboard-overview/dashboard-overview.component";
import {SetBudgetComponent} from "./feature/set-budget/set-budget.component";
import {ManageExpensesComponent} from "./feature/manage-expenses/manage-expenses.component";
import {AddExpensesComponent} from "./feature/add-expenses/add-expenses.component";
import {ReportExpensesComponent} from "./feature/report-expenses/report-expenses.component";
import {ProfileEditComponent} from "./feature/profile-edit/profile-edit.component";
import {SettingComponent} from "./feature/setting/setting.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent)
  },
  { path: 'home',
  component: DashboardHome,
    children: [
      {
        path: 'profile',
        component: ProfileEditComponent
      },
      {
        path: 'overview',
        component: DashboardOverviewComponent
      },
      {
        path: 'Set-budget',
        component: SetBudgetComponent
      },
      {
        path: 'add-expenses',
        component: AddExpensesComponent
      },
      {
        path: 'manage-expenses',
        component: ManageExpensesComponent
      },
      {
        path: 'reports',
        component: ReportExpensesComponent
      },
      {
        path: 'settings',
        component: SettingComponent
      },
    ]
},
  { path: 'sign-in',
    loadComponent: () => import('./feature/signup/signup.component').then(m => m.SignupComponent)
  },
  { path: 'new',
    loadComponent: () => import('./feature/add-expenses/add-expenses.component').then(m => m.AddExpensesComponent)
  },

];
