import { Component, OnInit } from '@angular/core';
import { MooddataService } from 'src/app/services/mooddata.service';
declare const Plotly;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  moodObject = {};
  moodObjectKeys = [];
  moodCount:any = {}
  avgScores = [];
  noData = false;
  
  
  constructor(public moodData: MooddataService) { }

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

getDayName(dateStr){
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let d = new Date(dateStr);
  let dayName = days[d.getDay()];
  return dayName;
}

sortDates(){
  this.moodObject = JSON.parse(localStorage.getItem('moodJournal'));
  this.moodObjectKeys = Object.keys(this.moodObject);
  this.moodObjectKeys = this.moodObjectKeys.sort(
    function (a, b) {
        a = a.toString().split('-');
        b = b.toString().split('-');
        return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
      }
    );
}

  ngOnInit() {

    this.moodData.stats = true;
    this.moodData.feeling = false;
    this.moodData.journal = false;


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
      1: "crying",
      0: "no data"
    }



    if (localStorage.getItem("moodJournal") !== null) {
      this.noData = false;
      this.sortDates();
      console.log("These are moodobjectkeys");
      console.log(this.moodObjectKeys);
      //let avgScores = []
      this.moodObjectKeys.forEach(ObjKey=>{
        let avgScore = 0;
        let tempScore = 0;
        this.moodObject[ObjKey].forEach(entry=>{
          tempScore += moodScore[entry.mood];
          if(this.moodCount.hasOwnProperty(entry.mood)){
            this.moodCount[entry.mood] += 1;
          }
          else{
            this.moodCount[entry.mood] = 1;
          }
        });
        avgScore = Math.ceil(tempScore/this.moodObject[ObjKey].length);
        this.avgScores.push(inverseMoodScore[avgScore]);
      });

      var trace1 = {
      x: this.moodObjectKeys,
      y: this.avgScores,
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
      yaxis: {
      //title: "Idea",
      //tickmode: "array",
      //tickvals: ['crying', 'sad', 'meh', 'happy', 'ecstatic'],
      //ticktext: ['Crying', 'Sad', 'Meh', 'Happy', 'Ecstatic']
      categoryarray: ['crying', 'sad', 'meh', 'happy', 'ecstatic']
    }
      //paper_bgcolor: '#7f7f7f',
      // /plot_bgcolor: '#c7c7c7'
    }
    Plotly.newPlot('trackerDiv', data, layout, {showSendToCloud: true, displayModeBar: false});

    data = [];
    Object.keys(this.moodCount).forEach(mood=>{
      let tempTrace = {
        orientation: 'h',
        x: [this.moodCount[mood]],
        y: [mood],
        type: 'bar',
        labels: Object.keys(this.moodData.colorMap),
        marker: {
          color: this.moodData.colorMap[mood]
        },
        name: mood
      };
      data.push(tempTrace);
    });
    
    
    let layout2 = {
      //width: this.getWidth() * 0.9,
      //height: this.getHeight() * 0.5,
      height:300,
      showlegend: false,
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      },
      yaxis: {
      //title: "Idea",
      //tickmode: "array",
      //tickvals: ['crying', 'sad', 'meh', 'happy', 'ecstatic'],
      //ticktext: ['Crying', 'Sad', 'Meh', 'Happy', 'Ecstatic']
      automargin: true,
      //tickvals: [0,1,2,3,4,5],
      //ticktext: ["No data","Crying","Sad", "Meh", "Happy", "Ecstatic"],
      //range: [1, 5],
    categoryarray: ['crying', 'sad', 'meh', 'happy', 'ecstatic']
    }
      
      //paper_bgcolor: '#7f7f7f',
      // /plot_bgcolor: '#c7c7c7'
    }
    Plotly.newPlot('countDiv', data, layout2, {showSendToCloud: true, displayModeBar: false});

    //Day chart
    data = [];

    let days = {'Sunday':{sum: 0, count:0, avg: 0} ,
                'Monday':{sum: 0, count:0, avg: 0},
                'Tuesday':{sum: 0, count:0, avg: 0},
                'Wednesday':{sum: 0, count:0, avg: 0},
                'Thursday':{sum: 0, count:0, avg: 0},
                'Friday':{sum: 0, count:0, avg: 0},
                'Saturday':{sum: 0, count:0, avg: 0}};

    this.moodObjectKeys.forEach((dat,index)=>{
      let day = this.getDayName(dat);
      if (days.hasOwnProperty(day)){
        days[day].sum = days[day].sum + moodScore[this.avgScores[index]];
        days[day].count += 1;
        days[day].avg = Math.ceil(days[day].sum/days[day].count);
      }
      else{
        days[day] = {sum: this.avgScores[index], count:1, avg: moodScore[this.avgScores[index]]}
      }
    });
    console.log(days);
    let daysIndex = [];
    let moodByDayIndex = [];
    Object.keys(days).forEach(day_=>{
      //daysIndex.push(day_);
      //moodByDayIndex.push(days[day_].avg);
      console.log(day_);
      console.log(days[day_].avg);
      let tempTrace = {
        //orientation: 'h',
        x: [day_],
        y: [inverseMoodScore[days[day_].avg]],
        type: 'bar',
        labels: Object.keys(this.moodData.colorMap),
        marker: {
          color: this.moodData.colorMap[inverseMoodScore[days[day_].avg]]
        },
        name: inverseMoodScore[days[day_].avg]
      };
      data.push(tempTrace);
    });

    
    
    let layout3 = {
      
      height:300,
      showlegend: false,
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      },
      xaxis: {
      //title: "Idea",
      tickmode: "array",
      automargin: true,
      tickvals: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      ticktext: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      
    },
    yaxis: {
      //title: "Idea",
      //tickmode: "array",
      automargin: true,
      //tickvals: [0,1,2,3,4,5],
      //ticktext: ["No data","Crying","Sad", "Meh", "Happy", "Ecstatic"],
      range: [0, 5],
    categoryarray: ["no data", 'crying', 'sad', 'meh', 'happy', 'ecstatic']
      //type: 'category'
      
      
    }
      
      //paper_bgcolor: '#7f7f7f',
      // /plot_bgcolor: '#c7c7c7'
    }
    Plotly.newPlot('dayDiv', data, layout3, {showSendToCloud: true, displayModeBar: false});
      
    }

    else{
      this.noData = true;
    }
  }

}
