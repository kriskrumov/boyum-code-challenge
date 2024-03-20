import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  isValidDate(date: any): boolean {
    return !isNaN(new Date(date).getTime());
  }
}
