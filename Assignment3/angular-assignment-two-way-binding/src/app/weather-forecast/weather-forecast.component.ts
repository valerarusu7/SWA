import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import HistoricalData from '../models/HistoricalData';
import ForecastData from '../models/ForecastData';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})

export class WeatherForecastComponent implements OnInit {

  historicalData: HistoricalData[] = [];
  forecastData: ForecastData[] = [];

  historicalDataToDisplay: HistoricalData[] = [];
  forecastDataToDisplay: ForecastData[] = [];

  selectedCity: string = "All";

  selectedFromDate?: Date;

  selectedTillDate?: Date;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadTheData();
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
  }

  getCityUpdateNotification(newCity: any) {
    this.selectedCity = newCity;
    this.filterByCity();
  }


  filterByCity(): void {
    if (this.selectedCity === "All") {
      this.historicalDataToDisplay = this.historicalData;
      this.forecastDataToDisplay = this.forecastData;
    } else {
      this.historicalDataToDisplay =
        this.historicalData.filter(element => element.place == this.selectedCity);
      this.forecastDataToDisplay =
        this.forecastData.filter(element => element.place == this.selectedCity);
    }

  }
}
