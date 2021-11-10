import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDataTableComponent } from './forecast-data-table.component';

describe('ForecastDataTableComponent', () => {
  let component: ForecastDataTableComponent;
  let fixture: ComponentFixture<ForecastDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
