import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  feeling = true;
  stats = false;
  journal = false;

  constructor() { }

  ngOnInit() {
  }

  activateStats(){
    this.stats = true;
    this.feeling = false;
    this.journal = false;
    console.log("stats activated");

  }

  activateFeeling(){
    this.stats = false;
    this.feeling = true;
    this.journal = false;

  }

  activateJournal(){
    this.stats = false;
    this.feeling = false;
    this.journal = true;

  }

}
