// collection-agency-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule,FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../services/form-data.service';
@Component({
  selector: 'app-collection-agency-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './collection-agency-details.component.html',
  styleUrls: ['./collection-agency-details.component.css']
})
export class CollectionAgencyDetailsComponent implements OnInit {
collectionForm!: FormGroup;
  selectedAgency: string = '';
  showOtherField: boolean = false;
  contactDate: string = '';
  private _contactDatesArray!: FormArray; // 

  constructor(private fb: FormBuilder, private router: Router, private formDataService: FormDataService) {
    
    this.collectionForm = this.fb.group({
      agencyName: [''],
      otherAgencyName: [''],
      mobileNumber: [''],
      emailAddress: [''],
      mailingAddress: this.fb.group({
        street: [''],
        apartment: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      contractorName: [''],
      fileNumber: [''],
      contactFrequency: [''],
      contactDates: this.fb.array([])
    });

    this._contactDatesArray = this.collectionForm.get('contactDates') as FormArray;
    this.addDateEntry(); // Add initial date entry
  }

  get contactDatesArray() {
    return this.collectionForm.get('contactDates') as FormArray;
  }

  addDateEntry() {
    const newDateGroup = this.fb.group({
      date: [''],
      time: ['']
    });
    this.contactDatesArray.push(newDateGroup);
  }



  ngOnInit(): void {
    // this.collectionForm = this.fb.group({
    //   agencyName: ['', Validators.required],
    //   otherAgencyName: [''],
    //   mobileNumber: [''],
    //   emailAddress: ['', [Validators.email]],
    //   mailingAddress: this.fb.group({
    //     street: [''],
    //     apartment: [''],
    //     city: [''],
    //     state: [''],
    //     country: [''],
    //     zipCode: ['']
    //   }),
    //   contractorName: [''],
    //   fileNumber: [''],
    //   contactFrequency: [''],
    //   contactDates: this.fb.array([this.createDateEntry()])
    // });
  }

  createDateEntry() {
    return this.fb.group({
      date: [''],
      time: ['']
    });
  }

  onAgencyChange(event: any) {
    const selectedValue = event.target.value;
    this.selectedAgency = selectedValue;
    this.showOtherField = selectedValue === 'Other';
  }

  addAnotherAgency() {
    // Logic to add another agency
    console.log('Adding another agency');
  }

//   addDateEntry() {
// const dateEntries = this.collectionForm.get('contactDates') as FormArray;
//     dateEntries.push(this.createDateEntry());
//   }

  navigateBack() {
    this.router.navigate(['/equifax-credit-report']);
  }

  // Update the navigateNext method
  navigateNext() {
    console.log('navigating next')
    this.formDataService.setAgencyData({
      agencyName: this.collectionForm.get('agencyName')?.value,
      // Add any other fields you want to pass
    });
    this.router.navigate(['/details-of-harrassment']);
    
    // if (this.collectionForm.valid) {
    //   // Save the agency data to the service
    //   this.formDataService.setAgencyData({
    //     agencyName: this.collectionForm.get('agencyName')?.value,
    //     // Add any other fields you want to pass
    //   });
      
    //   this.router.navigate(['/details-of-harassment']);
    // }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}