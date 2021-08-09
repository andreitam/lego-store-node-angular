import { Injectable } from '@angular/core';
import { Availability } from '../types/availability';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  avilabilities: Availability[] = [Availability.Availablenow,
                            Availability.Coomingsoon,
                            Availability.Outofstock,
                            Availability.Uponorder]

  constructor() { }

  getAvailabilities(): Availability[] {
    return this.avilabilities;
  }
}


