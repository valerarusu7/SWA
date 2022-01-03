import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import WarningsData from '../models/WarningsData'
import { Observable } from 'rxjs';
import WarningData from '../models/WarningData';
import { timer } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs'
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})

export class WeatherForecastComponent implements OnInit {

 
  warningsDataToDisplay: WarningsData;
  latestDataToDisplay: WarningsData;
  notifications: string= "Enabled";
  severityLevel: number=0;
  timeInterval : number =20000;
  polledWarnings: Observable<WarningsData>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.startInterval();
  }


  startInterval() {
    this.polledWarnings = timer(0, this.timeInterval).pipe(
        concatMap(_ => this.http.get<WarningsData>('http://localhost:8080/warnings')),
        takeWhile(val => this.notifications!= "Disabled"),
        map((Response : WarningsData) => {
          this.warningsDataToDisplay = Response;
          this.loadTheData(this.warningsDataToDisplay.time);
          this.warningsDataToDisplay.warnings = this.warningsDataToDisplay.warnings.filter(element =>  element.severity >= this.severityLevel);
          return Response;
          }),
      );
    this.polledWarnings.subscribe();
}

  sortWarningsByDate(data: WarningData []): WarningData[] {
    return data.sort((a,b)=>a.prediction.time.getTime()-b.prediction.time.getTime())
  }

  getUpdateSevirityLevelNotification(newSeverityLevel: any) {
    this.severityLevel = newSeverityLevel;
      this.warningsDataToDisplay.warnings = this.warningsDataToDisplay.warnings.filter(element =>  element.severity >= this.severityLevel);
      this.startInterval();
  }


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
      this.startInterval();
    }
    else{
      this.warningsDataToDisplay.warnings=[];
    }
  }
}
