import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDeckComponent } from './display-deck.component';

describe('DisplayDeckComponent', () => {
  let component: DisplayDeckComponent;
  let fixture: ComponentFixture<DisplayDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
