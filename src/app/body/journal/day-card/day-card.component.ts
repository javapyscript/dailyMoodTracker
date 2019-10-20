import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {
  
  @Input() date:string;
  @Input() entries:Array<Object>;

  newdate:Date;
  currentDate;

  constructor() { }

  ngOnInit() {
    this.newdate = new Date(this.date);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dayName = days[this.newdate.getDay()];
    let monthName = months[this.newdate.getMonth()];
    this.currentDate = dayName + ', ' + monthName + ' ' + this.newdate.getDate() + ', ' + this.newdate.getFullYear();
  }

}
