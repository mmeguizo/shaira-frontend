import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-final-confirmation',
  templateUrl: './final-confirmation.component.html',
  styleUrls: ['./final-confirmation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FinalConfirmationComponent {
  confirmationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.confirmationForm = this.fb.group({
      confirmAccuracy: [false, Validators.requiredTrue]
    });
  }

  getStepLabel(step: number): string {
    const labels = {
      1: 'Client Information',
      2: 'Employer Information',
      3: 'Equifax Credit Report',
      4: 'Collection Agency Details',
      5: 'Details of Harassment',
      6: 'Supporting Documentation',
      7: 'Power of Attorney'
    };
    return labels[step as keyof typeof labels];
  }

  navigateBack() {
    this.router.navigate(['/power-of-attorney']);
  }

  submit() {
    if (this.confirmationForm.valid) {
      // Handle form submission
      console.log('Form submitted');
    }
  }
}
