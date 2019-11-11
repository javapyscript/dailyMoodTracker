import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MooddataService {

  currentMood = "";
  currentDate = this.formatDate(new Date());
  currentTime = new Date().getHours() + ":" + new Date().getMinutes();
  currFeeling = '';
  colorMap = {
    'ecstatic': '#EDA479',
    'happy': 'rgb(2, 163, 96)',
    'meh': '#9AD9DB',
    'sad': '#A3A7B0',
    'crying': '#2c345c',
  }

  feeling = true;
  stats = false;
  journal = false;

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
