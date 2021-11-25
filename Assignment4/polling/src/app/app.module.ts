import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { PostFormComponent } from './post-form/post-form.component';
import { DataFiltersComponent } from './data-filters/data-filters.component';
import { HistoricalDataTableComponent } from './historical-data-table/historical-data-table.component';
import { ForecastDataTableComponent } from './forecast-data-table/forecast-data-table.component';
import { WarningsComponent } from './warnings/warnings.component';
import { LatestWarningsComponent } from './latest-warnings/latest-warnings.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherForecastComponent,
    PostFormComponent,
    DataFiltersComponent,
    HistoricalDataTableComponent,
    ForecastDataTableComponent,
    WarningsComponent,
    LatestWarningsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
