import { Component, OnInit, Input } from '@angular/core';
import WarningData from '../models/WarningData';
import WarningsData from '../models/WarningsData';


@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.component.html',
  styleUrls: ['./warnings.component.scss']
})
export class WarningsComponent implements OnInit {

  @Input()
  warningsDataToDisplay: WarningsData;

  constructor() { }

  ngOnInit(): void {
  }
}
