import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FeelingComponent } from './body/feeling/feeling.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatsharedModule } from './matshared/matshared.module';
import { CalendarBlockComponent } from './body/feeling/calendar-block/calendar-block.component';
import { EmojiBlockComponent } from './body/feeling/emoji-block/emoji-block.component';
import { JournalComponent } from './body/journal/journal.component';
import { DayCardComponent } from './body/journal/day-card/day-card.component';
import { MooddataService } from './services/mooddata.service';
import { EntryComponent } from './body/journal/dayCard/entry/entry.component';
import { DailyEntryComponent } from './body/journal/daily-entry/daily-entry.component';
import { StatsComponent } from './body/stats/stats.component';
import { FooterComponent } from './footer/footer.component';


const appRoutes: Routes = [
  
  { path: 'journal', component: JournalComponent },
  {path:'stats', component: StatsComponent},
  
  { path: '',
    redirectTo: '/feeling',
    pathMatch: 'prefix'
  },
  {path:'feeling', component: FeelingComponent},
  
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FeelingComponent,
    CalendarBlockComponent,
    EmojiBlockComponent,
    JournalComponent,
    DayCardComponent,
    EntryComponent,
    DailyEntryComponent,
    StatsComponent,
    FooterComponent,
  
    
  ],
  imports: [
    BrowserModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatsharedModule,
    
    
    RouterModule.forRoot(
      appRoutes, {enableTracing: true}
      //{   enableTracing: true } // <-- debugging purposes only
    )
    
  ],
  providers: [MooddataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
