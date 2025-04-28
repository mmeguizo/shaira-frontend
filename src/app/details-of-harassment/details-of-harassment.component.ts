import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../services/form-data.service';
@Component({
  selector: 'app-details-of-harassment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details-of-harassment.component.html',
  styleUrls: ['./details-of-harassment.component.css'],
})
export class DetailsOfHarassmentComponent implements OnInit {
  harassmentForm!: FormGroup;
  agencies: any[] = [{ isCollapsed: false }];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService
  ) {
    this.initForm();
  }

  initForm() {
    this.harassmentForm = this.fb.group({
      agencyForms: this.fb.array([this.createAgencyForm()]),
    });
  }

  createAgencyForm() {
    const agencyData = this.formDataService.getAgencyData();
    const agencyName = agencyData.agencyName || '';

    return this.fb.group({
      selectedAgency: [{value: agencyName, disabled: true}],
      contactForms: this.fb.array([this.initContactForm()]),
      threatToSue: [false],
      threatToTakeHome: [false],
      threatWithSheriff: [false],
      otherThreats: [false],
      otherThreatsDetails: [''],
    });
  }

  get agencyForms() {
    return this.harassmentForm.get('agencyForms') as FormArray;
  }

  // Initialize a contact form with contactType and contactDetails
  initContactForm() {
    return this.fb.group({
      contactType: ['', Validators.required],
      contactDetails: this.fb.array([this.initContactDetail()]),
    });
  }

  // Initialize a contact detail with count, date and times array
  initContactDetail() {
    return this.fb.group({
      count: [1, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      times: [[]],
    });
  }

  // Get the contact forms for a specific agency
  getContactForms(agencyIndex: number) {
    return this.agencyForms.at(agencyIndex).get('contactForms') as FormArray;
  }

  // Get the contact details for a specific contact form
  getContactDetails(agencyIndex: number, contactFormIndex: number) {
    return this.getContactForms(agencyIndex)
      .at(contactFormIndex)
      .get('contactDetails') as FormArray;
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

  // Add a new contact form to an agency
  addContactForm(agencyIndex: number) {
    const contactForms = this.getContactForms(agencyIndex);
    contactForms.push(this.initContactForm());
  }

  // Add a new contact detail to a contact form
  addContactDetail(agencyIndex: number, contactFormIndex: number) {
    const contactDetails = this.getContactDetails(agencyIndex, contactFormIndex);
    contactDetails.push(this.initContactDetail());
  }

  // Add a time to the times array
  addTime(event: any, agencyIndex: number, contactFormIndex: number, detailIndex: number) {
    const timeValue = event.target.value;
    if (!timeValue) return;

    const contactDetail = this.getContactDetails(agencyIndex, contactFormIndex).at(detailIndex);
    const times = [...contactDetail.get('times')?.value];

    // Format time to display (convert to AM/PM format)
    const formattedTime = this.formatTime(timeValue);

    times.push(formattedTime);
    contactDetail.get('times')?.setValue(times);

    // Clear the input
    event.target.value = '';
  }

  // Remove a time from the times array
  removeTime(
    agencyIndex: number,
    contactFormIndex: number,
    detailIndex: number,
    timeIndex: number
  ) {
    const contactDetail = this.getContactDetails(agencyIndex, contactFormIndex).at(detailIndex);
    const times = [...contactDetail.get('times')?.value];
    times.splice(timeIndex, 1);
    contactDetail.get('times')?.setValue(times);
  }

  // Format time from 24h to AM/PM
  formatTime(time24: string): string {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${suffix}`;
  }

  navigateBack() {
    this.router.navigate(['/collection-agency-details']);
  }

  navigateNext() {
    this.router.navigate(['/supporting-documentation']);
  }

  ngOnInit(): void {}
}
