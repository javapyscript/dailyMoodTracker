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
  

  constructor(public moodData: MooddataService) { }

  ngOnInit() {
    
    if (localStorage.getItem("moodJournal") !== null) {
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
    /*for (var day in this.moodObject) {
        if (this.moodObject.hasOwnProperty(day)) {
            
        }
      }*/
  }

}
