import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import HistoricalData from '../models/HistoricalData';
import WarningsData from '../models/WarningsData'
import ForecastData from '../models/ForecastData';
import { Observable } from 'rxjs';
import WarningData from '../models/WarningData';
import { timer, interval } from 'rxjs';
import { Subject } from 'rxjs';
import { concatMap, map, merge, mergeScan, } from 'rxjs/operators';
import { Subscription } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators';
import { takeWhile } from 'rxjs/operators';
import { distinctUntilKeyChanged, pluck } from 'rxjs/operators'


@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})

export class WeatherForecastComponent implements OnInit {

 
  warningsData: WarningsData;
  warningData: WarningData[]=[];
  LatestData: WarningsData;


  warningsDataToDisplay: WarningsData;
  latestDataToDisplay: WarningsData;
  warningDataToDisplay: WarningData[]=[];
  lastUpdate: Date;

  notifications: string= "Enabled";
  severityLevel: number=0;
  timeInterval : number =20000;
  polledWarnings: Observable<WarningsData>;
  sub: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.startInterval();
  }


  startInterval() {
    this.polledWarnings = timer(0, this.timeInterval).pipe(
        concatMap(_ => this.http.get<WarningsData>('http://localhost:8080/warnings')),
        takeWhile(val => this.notifications!= "Disabled"),
        map((Response : WarningsData) => {
          this.warningsData = Response;
          this.warningsDataToDisplay = Response;
          this.loadTheData(this.warningsDataToDisplay.time);
          return Response;
          }),
      );
      this.sub = this.polledWarnings.subscribe((data) => {
      });
}

  sortWarningsByDate(data: WarningData []): WarningData[] {
    return data.sort((a,b)=>a.prediction.time.getTime()-b.prediction.time.getTime())
  }

  getUpdateSevirityLevelNotification(newSeverityLevel: any) {
    this.severityLevel = newSeverityLevel;
      this.warningsDataToDisplay.warnings = this.warningsData.warnings.filter(element =>  element.severity >= this.severityLevel);
      this.startInterval();
  }

  // loadTheData(): void {
  //   this.http.get<WarningsData>('http://localhost:8080/warnings/since/2021-11-25T17:14:08.828Z')
  //     .subscribe(Response => {
  //       this.latestDataToDisplay = Response;
  //       this.latestDataToDisplay.warnings = this.latestDataToDisplay.warnings.filter(element =>  element.severity >= this.severityLevel);
  //     });
  //   }

  loadTheData(latestTime: Date): void {
     var myPastDate=new Date(latestTime);
         myPastDate.setSeconds(myPastDate.getDate() - 20);
    this.http.get<WarningsData>('http://localhost:8080/warnings/since/'+myPastDate)
      .subscribe(Response => {
        this.latestDataToDisplay = Response;
        this.latestDataToDisplay.warnings = this.latestDataToDisplay.warnings.filter(element =>  element.severity >= this.severityLevel);
      });
    }



  getSelectedNotificationStatus(status: any) {
    this.notifications = status;
    this.filterData();
  }

  
  filterData(): void {
    if (this.notifications == "Enabled") {
      this.warningsDataToDisplay.warnings=[];
      this.startInterval();
    }
    else{
      this.warningsDataToDisplay.warnings=[];
    }
  }
}
