import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticPlayerComponent } from './statistic-player.component';

describe('StatisticPlayerComponent', () => {
  let component: StatisticPlayerComponent;
  let fixture: ComponentFixture<StatisticPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
