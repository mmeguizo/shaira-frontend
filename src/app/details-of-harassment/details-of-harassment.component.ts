import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-of-harassment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details-of-harassment.component.html',
  styleUrls: ['./details-of-harassment.component.css']
})
export class DetailsOfHarassmentComponent implements OnInit {
  harassmentForm!: FormGroup;
  agencies: any[] = [{ isCollapsed: false }];

  constructor(private fb: FormBuilder, private router: Router) {
    this.initForm();
  }

  initForm() {
    this.harassmentForm = this.fb.group({
      agencyForms: this.fb.array([this.createAgencyForm()])
    });
  }

  createAgencyForm() {
    return this.fb.group({
      selectedAgency: ['', Validators.required],
      contactType: ['', Validators.required],
      contactDetails: this.fb.array([this.createContactDetail()]),
      threatToSue: [false],
      threatToTakeHome: [false],
      threatWithSheriff: [false],
      otherThreats: [false],
      otherThreatsDetails: ['']
    });
  }

  get agencyForms() {
    return this.harassmentForm.get('agencyForms') as FormArray;
  }

  getContactDetails(agencyIndex: number) {
    return (this.agencyForms.at(agencyIndex).get('contactDetails') as FormArray);
  }

  createContactDetail() {
    return this.fb.group({
      count: [''],
      date: [''],
      time: ['']
    });
  }

  toggleCollapse(index: number) {
    this.agencies[index].isCollapsed = !this.agencies[index].isCollapsed;
  }

  addAnotherAgency() {
    this.agencies.push({ isCollapsed: false });
    this.agencyForms.push(this.createAgencyForm());
  }

  removeAgency(index: number) {
    this.agencies.splice(index, 1);
    this.agencyForms.removeAt(index);
  }

  addContactDetail(agencyIndex: number) {
    const contactDetails = this.getContactDetails(agencyIndex);
    contactDetails.push(this.createContactDetail());
  }

  navigateBack() {
    this.router.navigate(['/collection-agency-details']);
  }

  navigateNext() {
    this.router.navigate(['/supporting-documentation']);

    // if (this.harassmentForm.valid) {
    //   this.router.navigate(['/supporting-documentation']);
    // }
  }

  ngOnInit(): void {
  }
}
