import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import HistoricalData from '../models/HistoricalData';
import WarningsData from '../models/WarningsData'
import ForecastData from '../models/ForecastData';
import { Observable } from 'rxjs';
import WarningData from '../models/WarningData';
import { timer, interval } from 'rxjs';
import { Subject } from 'rxjs';
import { concatMap, map, merge, } from 'rxjs/operators';
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})

export class WeatherForecastComponent implements OnInit {

  historicalData: HistoricalData[] = [];
  forecastData: ForecastData[] = [];
  warningsData: WarningsData;
  warningData: WarningData[]=[];
  filteredWarningsDataToDisplay: WarningData[] =[];
  


  historicalDataToDisplay: HistoricalData[] = [];
  forecastDataToDisplay: ForecastData[] = [];
  warningsDataToDisplay: WarningsData;
  warningDataToDisplay: WarningData[]=[];


  selectedCity: string = "All";

  selectedFromDate?: Date;

  selectedTillDate?: Date;

  severityLevel?: number=0;
  
  timeInterval : number = 10000;

  polledWarnings: Observable<WarningsData>;
  manualRefresh = new Subject();
  sub: Subscription;
  dataToShow: WarningsData;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadTheData();
    this.startInterval();
  }


  startInterval() {
    this.polledWarnings = timer(0, this.timeInterval).pipe(
        merge(this.manualRefresh),
        concatMap(_ => this.http.get<WarningsData>('http://localhost:8080/warnings')),
        map((Response : WarningsData) => {
          console.log( "Response")
          this.warningsData = Response;
          this.warningsDataToDisplay = Response;
          this.warningsDataToDisplay.warnings = this.warningsData.warnings.filter(element =>  element.severity >= this.severityLevel);
          console.log( Response)
          return Response;
          }),
      );
      this.sub = this.polledWarnings.subscribe((data) => {
      });
  }

  getUpdateSevirityLevelNotification(newSeverityLevel: any) {
    this.severityLevel = newSeverityLevel;
      this.warningsDataToDisplay.warnings = this.warningsData.warnings.filter(element =>  element.severity >= this.severityLevel);
      this.startInterval();
  }

  loadTheData(): void {
    this.http.get<HistoricalData[]>('http://localhost:8080/data')
      .subscribe(Response => {
        this.historicalData = Response;
        this.historicalDataToDisplay = Response;
      })
    this.http.get<ForecastData[]>('http://localhost:8080/forecast')
      .subscribe(Response => {
        this.forecastData = Response;
        this.forecastDataToDisplay = Response;
      })
    // Refresh the fields
    this.selectedCity = "All";
    this.selectedFromDate = undefined;
    this.selectedTillDate = undefined;
  }

  getCityUpdateNotification(newCity: any) {
    this.selectedCity = newCity;
    this.filterData();
  }

  getSelectedFromDateUpdateNotification(newFromDate: Date) {
    this.selectedFromDate = newFromDate;
    this.filterData();
  }

  getSelectedTillDateUpdateNotification(newTillDate: any) {
    this.selectedTillDate = newTillDate;
    this.filterData();
  }
  
  filterData(): void {
    let filteredHistoricalDataToDisplay: HistoricalData[] = [...this.historicalData];
    let filteredForecastDataToDisplay: ForecastData[] = [...this.forecastData];
    if (this.selectedCity !== "All") {
      filteredHistoricalDataToDisplay =
        filteredHistoricalDataToDisplay.filter(element => element.place == this.selectedCity);
      filteredForecastDataToDisplay =
        filteredForecastDataToDisplay.filter(element => element.place == this.selectedCity);
    }
    if (this.selectedFromDate !== undefined) {
      let fromDate: Date = this.selectedFromDate;
      filteredHistoricalDataToDisplay = filteredHistoricalDataToDisplay.filter(element => new Date(element.time) >= new Date(fromDate));
      filteredForecastDataToDisplay = filteredForecastDataToDisplay.filter(element => new Date(element.time) >= new Date(fromDate));
    }
    if (this.selectedTillDate !== undefined) {
      let tillDate: Date = this.selectedTillDate;
      filteredHistoricalDataToDisplay = filteredHistoricalDataToDisplay.filter(element => new Date(element.time) <= new Date(tillDate));
      filteredForecastDataToDisplay = filteredForecastDataToDisplay.filter(element => new Date(element.time) <= new Date(tillDate));

    }

    this.historicalDataToDisplay = filteredHistoricalDataToDisplay;
    this.forecastDataToDisplay = filteredForecastDataToDisplay;
  }
}
