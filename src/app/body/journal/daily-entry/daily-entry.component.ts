import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-daily-entry',
  templateUrl: './daily-entry.component.html',
  styleUrls: ['./daily-entry.component.scss']
})
export class DailyEntryComponent implements OnInit {

  @Input() entryData:any;
  constructor() { }

  ngOnInit() {
  }

}
