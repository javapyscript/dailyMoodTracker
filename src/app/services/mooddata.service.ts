import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MooddataService {

  currentMood = "";
  currentDate = this.formatDate(new Date());
  currentTime = new Date().getHours() + ":" + new Date().getMinutes();
  currFeeling = '';

  constructor() { }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
}
