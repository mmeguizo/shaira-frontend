import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//@ts-ignore
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import country from './flags.json';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
@Component({
  selector: 'app-client-information',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './client-information.component.html',
  styleUrls: ['./client-information.component.css'],
})
export class ClientInformationComponent implements OnInit {
  faUpLong = faUpLong;
  nations = country.sort((a, b) => a.code.localeCompare(b.code));
  selectedFile: File | null = null;

  dateOfBirthControl = new FormControl<string>('', {
    validators: [Validators.required, this.ageValidator],
    nonNullable: true,
  });

  maxDate: string;
  constructor(private router: Router) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.initializeCountryCodeSelect();
    console.log(country);
  }

  private ageValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const today = new Date();
    const birthDate = new Date(control.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18 ? null : { underage: true };
  }

  onDateChange(event: any) {
    this.dateOfBirthControl.updateValueAndValidity();
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  removeFile(event: Event) {
    event.stopPropagation();
    this.selectedFile = null;
  }

  initializeCountryCodeSelect() {
    const select = document.querySelector('.country-code select');
    if (select) {
      select.addEventListener('change', event => {
        const selectedOption = (event.target as HTMLSelectElement).options[
          (event.target as HTMLSelectElement).selectedIndex
        ];
        const flag = selectedOption.getAttribute('data-flag');
        const flagImg = `https://flagcdn.com/w20/${flag}.png`;
        // Update the selected option display
      });
    }
  }

  navigateToEmployerInfo() {
    this.router.navigate(['/employer-information']);
  }
}
