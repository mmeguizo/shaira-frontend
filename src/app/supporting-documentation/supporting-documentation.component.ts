import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-supporting-documentation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './supporting-documentation.component.html',
  styleUrls: ['./supporting-documentation.component.css'],
})
export class SupportingDocumentationComponent implements OnInit {
  documentationForm!: FormGroup;
  selectedFiles: File[] = [];
  faUpLong = faUpLong;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.documentationForm = this.fb.group({
      callLogs: [false],
      emailsLetters: [false],
      voicemail: [false],
      otherEvidence: [false],
      otherEvidenceDetails: [''],
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
      8: 'Final Confirmation',
    };
    return steps[step as keyof typeof steps];
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.closest('.upload-container')?.classList.add('drag-over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.closest('.upload-container')?.classList.remove('drag-over');

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  handleFiles(files: FileList) {
    Array.from(files).forEach(file => {
      if (!this.selectedFiles.some(f => f.name === file.name)) {
        this.selectedFiles.push(file);
      }
    });
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  navigateBack() {
    this.router.navigate(['/details-of-harrassment']);
  }

  navigateNext() {
    this.router.navigate(['/power-of-attorney']);

    // if (this.documentationForm.valid) {
    //   this.router.navigate(['/power-of-attorney']);
    // }
  }

  ngOnInit(): void {}
}
