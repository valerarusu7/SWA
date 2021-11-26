import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestWarningsComponent } from './latest-warnings.component';

describe('LatestWarningsComponent', () => {
  let component: LatestWarningsComponent;
  let fixture: ComponentFixture<LatestWarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestWarningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
