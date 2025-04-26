import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//@ts-ignore
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-equifax-credit-report',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './equifax-credit-report.component.html',
  styleUrls: ['./equifax-credit-report.component.css']
})
export class EquifaxCreditReportComponent {
  faUpLong = faUpLong;
  selectedFile: File | null = null;

  constructor(private router: Router) {}

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

  goBack() {
    this.router.navigate(['/employer-information']);
  }

  goNext() {
    this.router.navigate(['/collection-agency-details']);
  }
}