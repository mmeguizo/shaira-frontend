import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import country from '../client-information/flags.json';

@Component({
  selector: 'app-power-of-attorney',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './power-of-attorney.component.html',
  styleUrls: ['./power-of-attorney.component.css']
})
export class PowerOfAttorneyComponent implements OnInit {
  poaForm!: FormGroup;
  countries = country;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.poaForm = this.fb.group({
      hasPoa: ['', Validators.required],
      poaInfo: this.fb.group({
        fullName: [''],
        countryCode: ['US'],
        phoneNumber: [''],
        email: ['', [Validators.email]],
        relationship: ['']
      }),
      nextOfKin: this.fb.group({
        fullName: ['', Validators.required],
        countryCode: ['US', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        relationship: ['', Validators.required],
        street: ['', Validators.required],
        apartment: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
      })
    });

    this.setupPoaValidation();
  }

  setupPoaValidation() {
    this.poaForm.get('hasPoa')?.valueChanges.subscribe(value => {
      const poaInfo = this.poaForm.get('poaInfo');
      if (poaInfo) {
        const validators = value === 'YES' ? [Validators.required] : [];
        Object.keys(poaInfo.value).forEach(key => {
          const control = poaInfo.get(key);
          if (control) {
            if (key === 'email') {
              control.setValidators([...validators, Validators.email]);
            } else if (key === 'phoneNumber') {
              control.setValidators([...validators, Validators.pattern('^[0-9]{10}$')]);
            } else {
              control.setValidators(validators);
            }
            control.updateValueAndValidity({ emitEvent: false });
          }
        });
      }
    });
  }

  getStepLabel(step: number): string {
    const steps = {
      1: 'Client Information',
      2: 'Employer Information',
      3: 'Equifax Credit Report',
      4: 'Collection Agency Details',
      5: 'Details of Harassment',
      6: 'Supporting Documentation',
      7: 'Power of Attorney',
      8: 'Final Confirmation'
    };
    return steps[step as keyof typeof steps];
  }

  navigateBack() {
    this.router.navigate(['/supporting-documentation']);
  }

  navigateNext() {
    this.router.navigate(['/final-confirmation']);

    // if (this.poaForm.valid) {
    //   this.router.navigate(['/final-confirmation']);
    // } else {
    //   this.markFormGroupTouched(this.poaForm);
    // }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isFieldInvalid(formGroup: string, field: string): boolean {
    const control = this.poaForm.get(`${formGroup}.${field}`);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
