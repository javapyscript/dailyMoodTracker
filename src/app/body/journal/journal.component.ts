import { Component, OnInit } from '@angular/core';
import { MooddataService } from 'src/app/services/mooddata.service';


@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  moodObject = {};
  moodObjectKeys = [];
  noData = false;
  

  constructor(public moodData: MooddataService) { }

  ngOnInit() {

    this.moodData.stats = false;
    this.moodData.feeling = false;
    this.moodData.journal = true;
    
    if (localStorage.getItem("moodJournal") !== null) {
      this.noData = false;
      this.moodObject = JSON.parse(localStorage.getItem('moodJournal'));
      this.moodObjectKeys = Object.keys(this.moodObject);
      this.moodObjectKeys = this.moodObjectKeys.sort(
        function (a, b) {
            a = a.toString().split('-');
            b = b.toString().split('-');
            return b[0] - a[0] || b[1] - a[1] || b[2] - a[2];
          }
        );
      console.log(this.moodObjectKeys);
    }
    else{
      this.noData = true;
    }
    /*for (var day in this.moodObject) {
        if (this.moodObject.hasOwnProperty(day)) {
            
        }
      }*/
  }

}
