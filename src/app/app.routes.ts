import { Routes } from '@angular/router';
import { ClientInformationComponent } from './client-information/client-information.component';
import { EmployerInformationComponent } from './employer-information/employer-information.component';
import { EquifaxCreditReportComponent } from './equifax-credit-report/equifax-credit-report.component';
import { CollectionAgencyDetailsComponent } from './collection-agency-details/collection-agency-details.component';
import { DetailsOfHarassmentComponent } from './details-of-harassment/details-of-harassment.component';
import { SupportingDocumentationComponent } from './supporting-documentation/supporting-documentation.component';
import { PowerOfAttorneyComponent } from './power-of-attorney/power-of-attorney.component';
import { FinalConfirmationComponent } from './final-confirmation/final-confirmation.component';

export const routes: Routes = [
  { path: '', redirectTo: 'client-information', pathMatch: 'full' },
  { path: 'client-information', component: ClientInformationComponent },
  { path: 'employer-information', component: EmployerInformationComponent },
  { path: 'equifax-credit-report', component: EquifaxCreditReportComponent },
  { path: 'collection-agency-details', component: CollectionAgencyDetailsComponent },
  { path: 'details-of-harrassment', component: DetailsOfHarassmentComponent },
  { path: 'supporting-documentation', component: SupportingDocumentationComponent },
  { path: 'power-of-attorney', component: PowerOfAttorneyComponent },
  { path: 'final-confirmation', component: FinalConfirmationComponent },
  // ... other routes
];