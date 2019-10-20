import { Component, OnInit } from '@angular/core';
import { MooddataService } from 'src/app/services/mooddata.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-block',
  templateUrl: './calendar-block.component.html',
  styleUrls: ['./calendar-block.component.scss']
})
export class CalendarBlockComponent implements OnInit {

  constructor(public moodData: MooddataService, public calendar: NgbCalendar) { }

  ngOnInit() {
    this.moodData.currentMood = "";
    this.moodData.currentDate = this.moodData.formatDate(new Date());
    this.moodData.currentTime = new Date().getHours() + ":" + new Date().getMinutes();
    this.moodData.currFeeling = '';
  }

  isWeekend = (date: NgbDate) =>  this.calendar.getWeekday(date) >= 6;


}
