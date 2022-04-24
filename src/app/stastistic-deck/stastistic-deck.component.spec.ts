import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StastisticDeckComponent } from './stastistic-deck.component';

describe('StastisticDeckComponent', () => {
  let component: StastisticDeckComponent;
  let fixture: ComponentFixture<StastisticDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StastisticDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StastisticDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
