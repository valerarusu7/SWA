import { Component, OnInit, Input } from '@angular/core';
import WarningData from '../models/WarningData';
import WarningsData from '../models/WarningsData';


@Component({
  selector: 'app-latest-warnings',
  templateUrl: './latest-warnings.component.html',
  styleUrls: ['./latest-warnings.component.scss']
})
export class LatestWarningsComponent implements OnInit {



  @Input()
  latestDataToDisplay: WarningsData;

  constructor() { }

  ngOnInit(): void {
  }

}
