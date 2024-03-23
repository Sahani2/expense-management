import { Component, Input } from '@angular/core';
import {SideNavButtonComponent} from "../side-nav-button/side-nav-button.component";
import {
  tuiIconBarChart,
  tuiIconCreditCard,
  tuiIconDollarSign,
  tuiIconFilePlus,
  tuiIconGrid,
  tuiIconLogOut
} from "@taiga-ui/icons";
import {CommonModule} from "@angular/common";
// import {Input} from "postcss";
import {ActivatedRoute, Router} from "@angular/router";
import {tuiPure} from "@taiga-ui/cdk";
import {TuiDurationOptions} from "@taiga-ui/core";


@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule, SideNavButtonComponent
  ],
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {

  @Input() isCollapsed = false;
  activeRoute: string = this.activatedRoute.snapshot['_routerState'].url.split('/').pop();
  protected readonly SideNavButtonComponent = SideNavButtonComponent;
  protected readonly tuiIconLogOut = tuiIconLogOut;

  constructor(
    private activatedRoute: ActivatedRoute, private router: Router
  ) {
  }

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return {value: '', params: {duration}};
  }

  onLogout() {
    // localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('sign-in');
  }
  navigateToOverview() {
    // localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/home/overview');
  }

  protected readonly tuiIconGrid = tuiIconGrid;
  protected readonly tuiIconFilePlus = tuiIconFilePlus;
  protected readonly tuiIconCreditCard = tuiIconCreditCard;
  protected readonly tuiIconBarChart = tuiIconBarChart;
  protected readonly tuiIconDollarSign = tuiIconDollarSign;

  navigateToManage() {
    this.router.navigateByUrl('/home/manage-expenses');
  }
}
