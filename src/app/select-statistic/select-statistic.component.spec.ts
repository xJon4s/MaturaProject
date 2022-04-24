import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStatisticComponent } from './select-statistic.component';

describe('SelectStatisticComponent', () => {
  let component: SelectStatisticComponent;
  let fixture: ComponentFixture<SelectStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
