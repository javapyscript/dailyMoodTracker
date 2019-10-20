import { Component, OnInit } from '@angular/core';
import { MooddataService } from 'src/app/services/mooddata.service';

@Component({
  selector: 'app-emoji-block',
  templateUrl: './emoji-block.component.html',
  styleUrls: ['./emoji-block.component.scss']
})
export class EmojiBlockComponent implements OnInit {

  constructor(public moodData: MooddataService) { }

  ngOnInit() {
  }

  changeCurrentMood(mood){
    this.moodData.currentMood = mood;
    console.log(mood);
  }

}
