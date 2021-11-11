import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import HistoricalData from '../models/HistoricalData';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  place: string = "";
  time: Date = new Date();
  type: string = "";
  unit: string = "";
  value: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  sendData(): void {
    let newForecast: HistoricalData = {
      place: this.place,
      time: this.time,
      type: this.type,
      unit: this.unit,
      value: this.value
    }
    this.http.post<HistoricalData>('http://localhost:8080/data', newForecast)
      .subscribe(data => console.log(data));
  }

}
