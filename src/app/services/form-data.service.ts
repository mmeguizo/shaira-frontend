import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private agencyData: any = {};

  setAgencyData(data: any) {
    this.agencyData = data;
  }

  getAgencyData() {
    return this.agencyData;
  }
}