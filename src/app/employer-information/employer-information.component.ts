import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employer-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employer-information.component.html',
  styleUrls: ['./employer-information.component.css'],
})
export class EmployerInformationComponent implements OnInit {
  contactedAtWork: boolean | null = null;
  maxDate: string;

  contactTimesControl = new FormControl('');
  contactDateControl = new FormControl('');
  contactTimeControl = new FormControl('');

  constructor(private router: Router) {
    // Set max date to today
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {}

  setContactedAtWork(value: boolean) {
    this.contactedAtWork = value;
  }

  goBack() {
    this.router.navigate(['/client-information']);
  }

  goNext() {
    this.router.navigate(['/equifax-credit-report']);
  }
}
