import {TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule} from "@taiga-ui/core";
import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {DashboardLayoutComponent} from "./components/dashboard-layout/dashboard-layout.component";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, HeaderComponent, DashboardLayoutComponent, FormsModule,HttpClientModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  // declarations: [
  //   AppComponent,
  //   SignupComponent,
  //   // Other components, directives, or pipes go here
  // ],
})
export class AppComponent {
  title = 'expence';
}
