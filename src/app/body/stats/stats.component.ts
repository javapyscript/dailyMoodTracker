import { Component, OnInit } from '@angular/core';
declare const Plotly;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  moodObject = {};
  moodObjectKeys = [];
  
  

  
  

  constructor() { }

  getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

  ngOnInit() {
    let moodScore = {
      "ecstatic":5,
      "happy":4,
      "meh":3,
      "sad":2,
      "crying":1,
    };

    let inverseMoodScore = {
      5: "ecstatic",
      4: "happy",
      3: "meh",
      2: "sad",
      1: "crying"
    }

    if (localStorage.getItem("moodJournal") !== null) {
      
      this.moodObject = JSON.parse(localStorage.getItem('moodJournal'));
      this.moodObjectKeys = Object.keys(this.moodObject);
      this.moodObjectKeys = this.moodObjectKeys.sort(
        function (a, b) {
            a = a.toString().split('-');
            b = b.toString().split('-');
            return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
          }
        );
      console.log(this.moodObjectKeys);
      let avgScores = []
      this.moodObjectKeys.forEach(ObjKey=>{
        let avgScore = 0;
        let tempScore = 0;
        this.moodObject[ObjKey].forEach(entry=>{
          tempScore += moodScore[entry.mood];
        });
        avgScore = Math.ceil(tempScore/this.moodObject[ObjKey].length);
        avgScores.push(inverseMoodScore[avgScore]);
      });

      

      var trace1 = {
      x: this.moodObjectKeys,
      y: avgScores,
      type: 'scatter',
    };

    

    let data = [trace1];

    let layout = {
      //width: this.getWidth() * 0.9,
      //height: this.getHeight() * 0.5,
      height:300,
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      },
      //paper_bgcolor: '#7f7f7f',
      // /plot_bgcolor: '#c7c7c7'
    }

    Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true, displayModeBar: false});
      
    }
  }

}
