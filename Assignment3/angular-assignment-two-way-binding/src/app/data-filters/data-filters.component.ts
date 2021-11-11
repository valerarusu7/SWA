import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import HistoricalData from '../models/HistoricalData';
import ForecastData from '../models/ForecastData';

@Component({
  selector: 'app-data-filters',
  templateUrl: './data-filters.component.html',
  styleUrls: ['./data-filters.component.scss']
})
export class DataFiltersComponent implements OnInit, OnChanges {

  @Input()
  historicalData: HistoricalData[] = [];

  @Input()
  forecastData: ForecastData[] = [];


  @Input()
  historicalDataToDisplay: HistoricalData[] = [];

  @Input()
  forecastDataToDisplay: ForecastData[] = [];

  uniqueCities: string[] = [];

  dateIntervals: Date[] = [];

  @Input()
  selectedCity: string = "All";
  
  @Output() 
  newSelectedCity: EventEmitter<string> = new EventEmitter();

  @Input()
  selectedFromDate? : Date;

  @Output()
  newSelectedFromDate : EventEmitter<Date> = new EventEmitter();

  @Input()
  selectedTillDate? : Date;

  @Output()
  newSelectedTillDate : EventEmitter<Date> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['historicalData'] || changes['forecastData']) {
      this.uniqueCities = this.getCities(this.historicalData, this.forecastData);
      this.dateIntervals = this.getAvailableDateIntervals(this.historicalData, this.forecastData);
    }
  }

  updateCity(event: MouseEvent): void {
    this.newSelectedCity.emit(this.selectedCity);
  }

  updateSelectedFromDate(event: MouseEvent): void {
    this.newSelectedFromDate.emit(this.selectedFromDate);
  }

  updateSelectedTillDate(event: MouseEvent): void {
    this.newSelectedTillDate.emit(this.selectedTillDate);
  }

  getCities(historicalData: HistoricalData[], forecastData: ForecastData[]): string[] {
    const cityEach: string[] = historicalData.map(e => {
      return e.place
    })
    const uniqueCities: string[] = cityEach.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })
    return uniqueCities;
  }

  getAvailableDateIntervals(historicalData: HistoricalData[], forecastData: ForecastData[]): Date[] {
    const historicalDateEach: Date[] = historicalData.map(e => {
      return e.time
    })
    const forecastDateEach: Date[] = forecastData.map(e => {
      return e.time
    })
    const dateEach: Date[] = historicalDateEach.concat(forecastDateEach);
    const uniqueDates: Date[] = dateEach.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })
    const sortedDates = uniqueDates.sort();

    const min = sortedDates[0];
    const max = sortedDates[sortedDates.length - 1];

    const minDate = new Date(min);
    const maxDate = new Date(max);

    let dates: Date[] = [];
    let newDate = new Date(minDate);

    while (newDate <= maxDate) {
      dates.push(new Date(newDate));
      newDate.setDate(newDate.getDate() + 1);
    }
    return dates;
  }

}
