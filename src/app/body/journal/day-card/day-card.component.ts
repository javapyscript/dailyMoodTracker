import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {
  
  @Input() date:string;
  @Input() entries:Array<Object>;

  moodObject = {};
  moodObjectKeys = [];

  newdate:Date;
  currentDate;

  headerColor = "";
  avgScore = 0;

  constructor() { }

  ngOnInit() {
    this.newdate = new Date(this.date);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dayName = days[this.newdate.getDay()];
    let monthName = months[this.newdate.getMonth()];
    this.currentDate = dayName + ', ' + monthName + ' ' + this.newdate.getDate() + ', ' + this.newdate.getFullYear();


    let moodScore = {
      "ecstatic":5,
      "happy":4,
      "meh":3,
      "sad":2,
      "crying":1,
    };

    let inverseMoodScore = {
      5: "#EDA479",
      4: "rgb(2, 163, 96)",
      3: "#9AD9DB",
      2: "#A3A7B0",
      1: "#2c345c"
    }

    
    if (localStorage.getItem("moodJournal") !== null) {
      
      this.moodObject = JSON.parse(localStorage.getItem('moodJournal'));
      
      let tempScore = 0;
      this.moodObject[this.date].forEach(entry=>{
        tempScore += moodScore[entry.mood];
      });
      this.avgScore = Math.ceil(tempScore/this.moodObject[this.date].length);
    }

    this.headerColor = inverseMoodScore[this.avgScore];


  }

}
