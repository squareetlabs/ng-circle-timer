import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCircleTimerComponent } from './ng-circle-timer.component';

describe('NgCircleTimerComponent', () => {
  let component: NgCircleTimerComponent;
  let fixture: ComponentFixture<NgCircleTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgCircleTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCircleTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
