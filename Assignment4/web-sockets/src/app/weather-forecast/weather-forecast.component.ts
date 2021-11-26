import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import WarningsData from '../models/WarningsData'
import WarningData from '../models/WarningData';
import { Subscription, Observable } from 'rxjs';
import { webSocket } from "rxjs/webSocket";

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})

export class WeatherForecastComponent implements OnInit {

  warningsData: WarningsData = { time: new Date(), warnings: [] };
  warningsDataToDisplay: WarningsData = { time: new Date(), warnings: [] };

  latestDataToDisplay: WarningData;

  lastUpdate: Date = new Date();

  notifications: string = "Enabled";
  severityLevel: number = 0;
  timeInterval: number = 20000;

  warningsDataSocket: WebSocket = new WebSocket("ws://localhost:8090/warnings");

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Normally I would use RxJs and perform actions here in subsribe but the implementation of the 
    // server is bad and instead of JSON accepts string as messages so next will not work. Therefore,
    // I will implement it the old fashioned way. If the server will be fixef you can move the code
    // from onmessage to the subscribe block and you will have your modern websocket
    // const webSocketWarnings = webSocket("ws://localhost:8090/warnings");
    // webSocketWarnings.subscribe(
    //   // Actions here
    // )
    // webSocketWarnings.next({message: 'subscribe'});

    this.websocketGetWarningsData(this.warningsDataSocket);
  }



  websocketGetWarningsData(webSocket: WebSocket): void {
    webSocket.onopen = () => {
      webSocket.send('subscribe')
    }
    webSocket.onmessage = message => {
      // So for some ungodly reason this socket sends a different object on the first message
      // and the on every different one, therefore I don't specify the type
      let objectReceived = JSON.parse(message.data)
      // And now let's check if it's the first object or the other (the first one has the field time)
      if (objectReceived.time === undefined) {
        // Now we know with what type of object we are working with
        let warningObject: WarningData = objectReceived;
        if (warningObject.prediction !== null) {
          this.warningsData.warnings.unshift(warningObject);
          this.updateSevirityLevelNotification(this.severityLevel)
          this.latestDataToDisplay = warningObject;
        }
        this.warningsDataToDisplay.time = new Date();
      } else {
        let warningsObject: WarningsData = objectReceived;
        // For some ungodly reason server returns a lot of null objects, so let's clean them up
        let dataWithoutNulls = this.removeNullPredictions(warningsObject);
        // Now let's see if there is some data here already, if the websocket was closed and now will be open again there will be some data lingering
        if(this.warningsData.warnings.length === 0) {
          this.warningsData = dataWithoutNulls;
          this.warningsDataToDisplay = { ...dataWithoutNulls }
          // If socket reopened add the new data to the old one
        } else {
          let bundledData = this.warningsData.warnings.concat(dataWithoutNulls.warnings);
          this.warningsData.time = dataWithoutNulls.time
          this.warningsData.warnings = bundledData;
          this.updateSevirityLevelNotification(this.severityLevel)
        }
        

      }

    }
  }

  // Function to remove null predictions from the data
  removeNullPredictions(warningsData: WarningsData): WarningsData {
    let cleanWarningsData: WarningsData = { time: new Date(), warnings: [] };
    if (warningsData.time !== undefined) {
      cleanWarningsData.time = new Date(warningsData.time);
    }
    warningsData.warnings.map(warning => {
      if (warning.prediction !== null) {
        cleanWarningsData.warnings.push(warning);
      }
    })
    return cleanWarningsData;
  }

  sortWarningsByDate(data: WarningData[]): WarningData[] {
    return data.sort((a, b) => a.prediction.time.getTime() - b.prediction.time.getTime())
  }

  updateSevirityLevelNotification(newSeverityLevel: number) {
    this.severityLevel = newSeverityLevel;
    this.warningsDataToDisplay.warnings = this.warningsData.warnings.filter(element => element.severity >= this.severityLevel);
  }

  getSelectedNotificationStatus(status: string) {
    if (status == "Enabled") {
      this.websocketGetWarningsData(this.warningsDataSocket)
      this.openTheSocket(this.warningsDataSocket);
    } else {
      this.closeTheSocket(this.warningsDataSocket)
    }
    this.notifications = status;

  }
  closeTheSocket(websocket: WebSocket): void {
    this.warningsDataSocket.close();
  }

  openTheSocket(websocket: WebSocket): void {
    this.warningsDataSocket = new WebSocket("ws://localhost:8090/warnings");
    this.websocketGetWarningsData(this.warningsDataSocket)
  }

}
