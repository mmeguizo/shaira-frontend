import { Routes } from '@angular/router';
import { ClientInformationComponent } from './client-information/client-information.component';
import { EmployerInformationComponent } from './employer-information/employer-information.component';
import { EquifaxCreditReportComponent } from './equifax-credit-report/equifax-credit-report.component';

export const routes: Routes = [
  { path: '', redirectTo: 'client-information', pathMatch: 'full' },
  { path: 'client-information', component: ClientInformationComponent },
  { path: 'employer-information', component: EmployerInformationComponent },
  { path: 'equifax-credit-report', component: EquifaxCreditReportComponent },
  // ... other routes
];