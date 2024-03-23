import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TuiSvgModule} from "@taiga-ui/core";

@Component({
  selector: 'app-side-nav-button',
  standalone: true,
  imports: [CommonModule, RouterLink, TuiSvgModule],
  templateUrl: './side-nav-button.component.html',
  styleUrl: './side-nav-button.component.less'
})
export class SideNavButtonComponent {
  @Input() tuiIcon: string;
  @Input() sideNavCollapsed: boolean = false;
  @Input() name: string;
  @Input() link: string;
}
