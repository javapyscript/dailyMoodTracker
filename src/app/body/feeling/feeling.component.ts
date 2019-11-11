import { Component, OnInit, ViewChild } from '@angular/core';
import { MooddataService } from 'src/app/services/mooddata.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
declare var Datepickk: any;

@Component({
  selector: 'app-feeling',
  templateUrl: './feeling.component.html',
  styleUrls: ['./feeling.component.scss']
})
export class FeelingComponent implements OnInit {
  
  datepicker;

  @ViewChild('errorModal', {static: false})
  errorModal: ModalDirective;

  constructor(public moodData: MooddataService, public calendar: NgbCalendar, private router: Router) { }

  ngOnInit() {
    /*var highlight = {
      start: new Date(2015,6,13),
      end: new Date(2015,6,19),
      backgroundColor: '#3faa56',
      color: '#ffffff',
      legend: 'CSS Conf.'
   };
   
   var highlight2 = {
      dates: [
        {
          start: new Date(2015,6,6),
          end: new Date(2015,6,7)
        },
        {
          start: new Date(2015,6,22),
          end: new Date(2015,6,23)
        }
      ],
      backgroundColor: '#E99C00',
      color: '#ffffff',
      legend: 'Holidays'
   };
   
     this.datepicker = new Datepickk({
     container: document.querySelector('#datepicker'),
     inline: true,
     range: true,
     highlight: [highlight,highlight2]
   });
   
   this.datepicker.setDate = new Date(2015,6,1);
   this.datepicker.hide();
   */


  this.moodData.stats = false;
    this.moodData.feeling = true;
    this.moodData.journal = false;


               
  }

  saveFeeling(){
    let moodObject = {};
    if (typeof this.moodData.currentDate !== "string"){
      let ngbDate:any = this.moodData.currentDate;
      this.moodData.currentDate = ngbDate.year + '-' + (ngbDate.month) + '-' + ngbDate.day;
      
    }
    
    if(this.moodData.currentMood === ''){
          this.errorModal.show();
          return;
    }
    if (localStorage.getItem("moodJournal") !== null) {
      moodObject = JSON.parse(localStorage.getItem('moodJournal'));
      
     
      if (moodObject.hasOwnProperty(this.moodData.currentDate)){
        moodObject[this.moodData.currentDate].push({
        'time': this.moodData.currentTime,
          'mood': this.moodData.currentMood,
          'notes': this.moodData.currFeeling,
          
        })
      }
      else{
        moodObject[this.moodData.currentDate] = [
          {'time': this.moodData.currentTime,
          'mood': this.moodData.currentMood,
          'notes': this.moodData.currFeeling,
          
          }
        ]
      }
      
      
    }
    else{
      
      moodObject[this.moodData.currentDate] = [
        {'time': this.moodData.currentTime,
         'mood': this.moodData.currentMood,
         'notes': this.moodData.currFeeling,
         
        }
      ]
    }
    this.router.navigateByUrl('/journal');
    localStorage.setItem('moodJournal', JSON.stringify(moodObject));
    this.moodData.currFeeling = '';
  }

}
