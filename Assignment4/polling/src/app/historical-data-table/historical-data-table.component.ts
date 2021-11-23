import { Component, Input, OnInit } from '@angular/core';
import HistoricalData from '../models/HistoricalData';

@Component({
  selector: 'app-historical-data-table',
  templateUrl: './historical-data-table.component.html',
  styleUrls: ['./historical-data-table.component.scss']
})
export class HistoricalDataTableComponent implements OnInit {

  @Input()
  historicalDataToDisplay: HistoricalData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
