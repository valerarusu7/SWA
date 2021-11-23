import { Component, OnInit, Input } from '@angular/core';
import ForecastData from '../models/ForecastData';

@Component({
  selector: 'app-forecast-data-table',
  templateUrl: './forecast-data-table.component.html',
  styleUrls: ['./forecast-data-table.component.scss']
})
export class ForecastDataTableComponent implements OnInit {

  @Input()
  forecastDataToDisplay: ForecastData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
