import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {UserDataService} from "../../services/user-data.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiAlertService, TuiErrorModule} from "@taiga-ui/core";
import {async} from "rxjs";
import {TuiFieldErrorPipeModule} from "@taiga-ui/kit";

@Component({
  selector: 'app-set-budget',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    AsyncPipe,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule
  ],
  templateUrl: './set-budget.component.html',
  styleUrl: './set-budget.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetBudgetComponent implements OnInit{
  setBudget: FormGroup;
  monthlyBudget: number = 0;

  constructor(private formBuilder: FormBuilder  , @Inject(TuiAlertService) private readonly alert: TuiAlertService , private userDataService: UserDataService ) {}

  ngOnInit(): void {
    this.monthlyBudget = this.userDataService.getMonthlyBudget();
    this.setBudget = this.formBuilder.group({
      monthlyBudget:[this.monthlyBudget]

    });
  }


  setMonthlyBudget() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (loggedUser) {
      loggedUser.monthlyBudget = this.monthlyBudget;
      localStorage.setItem(`user-${loggedUser.email}-monthlyBudget`, this.monthlyBudget.toString());
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      // alert('Successfully set monthly budget');
      this.alert
        .open('Successfully set monthly budget')
        .subscribe();

    } else {
      alert('User not found. Please sign in.');

    }
  }


  protected readonly Set = Set;
    protected readonly async = async;
}

