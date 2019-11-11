import { Component, OnInit } from '@angular/core';
import { MooddataService } from '../services/mooddata.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  

  constructor(public moodData:MooddataService) { }

  ngOnInit() {
  }

  activateStats(){
    this.moodData.stats = true;
    this.moodData.feeling = false;
    this.moodData.journal = false;
    console.log("stats activated");

  }

  activateFeeling(){
    this.moodData.stats = false;
    this.moodData.feeling = true;
    this.moodData.journal = false;

  }

  activateJournal(){
    this.moodData.stats = false;
    this.moodData.feeling = false;
    this.moodData.journal = true;

  }

}
