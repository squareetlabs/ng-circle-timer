import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export type StartDate = Date | string | number;
@Component({
  selector: 'ng-circle-timer',
  template: `
    <div class="base-timer">
      <svg class="base-timer-svg"
           viewBox="0 0 100 100"
           xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer-circle">
          <circle [class.base-timer-completed]=completed [class.base-timer-stroke]=!completed
                  cx="50"
                  cy="50"
                  r="45" />
          <path [attr.stroke-dasharray]="dasharray"
                [style.stroke]="color"
                id="remaining-time-stroke"
                d=" M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0">
          </path>
        </g>
      </svg>
      <span class="time">
    <span>{{formattedTimeLeft}}</span>
  </span>
    </div>
  `,
  styles: [
  ]
})
export class NgCircleTimerComponent implements OnInit, OnDestroy {
  @Input() startDate?: string; // only to set initial state (ngOnInit)
  @Input() duration = 0; // milliseconds
  @Input() color = '#1cbbf8';

  @Output() onComplete = new EventEmitter<boolean>();

  destroy$ = new Subject<void>();

  timeLeft = 0;
  ticking = false;
  completed = false;
  formattedTimeLeft = '';

  readonly fullDasharray = 283;
  dasharray = `${this.fullDasharray} ${this.fullDasharray}`;

  constructor() {}

  ngOnInit() {
    this.init(this.startDate);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  init(startDate?: StartDate): void {
    this.setTimeLeft(startDate);
    this.formatTimeLeft();
    this.setDasharray();

    if (this.timeLeft === 0) {
      this.completed = true;
    }
  }

  setTimeLeft(startDate?: StartDate): number {
    this.ticking = false;
    this.completed = false;
    this.destroy$.next();

    if (!startDate) {
      this.timeLeft = this.duration;
      return 0;
    }

    const startTime = new Date(<string>startDate).getTime();
    const endTime = startTime + this.duration;
    const timeLeftRaw = endTime - Date.now();
    if (timeLeftRaw <= 0) {
      this.timeLeft = 0;
      return 0;
    }

    const timeLeftSeconds = timeLeftRaw / 1000;

    this.timeLeft = Math.floor(timeLeftSeconds) * 1000;
    return timeLeftSeconds % 1;
  }

  start(startDate?: StartDate, delayMs = 0, replaying = false): void {
    if (this.ticking) {
      console.log('Cannot start: timer already running.');
      return;
    }

    const decimalPortion = this.setTimeLeft(startDate);
    const startDelayMs = delayMs + decimalPortion * 1000;
    this.formatTimeLeft();
    this.setDasharray();

    if (this.timeLeft === 0) {
      this.completed = true;
      console.log('Cannot start: timer already completed.');
      return;
    }

    timer(startDelayMs, 1000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.ticking = true;
          this.timeLeft -= 1000;
          if (this.timeLeft <= 0) {
            this.timeLeft = 0;
            this.ticking = false;
            this.completed = true;
            this.onComplete.emit(replaying);
            this.destroy$.next();
          }

          this.formatTimeLeft();
          this.setDasharray();
        });
  }

  replay(startDate?: StartDate): void {
    this.start(startDate, 1200, true);
  }

  pause(): void {}

  continue(): void {}

  complete(): void {
    this.timeLeft = 0;
    this.ticking = false;
    this.completed = true;
    this.destroy$.next();

    this.formatTimeLeft();
    this.setDasharray();
  }

  isTicking(): boolean {
    return this.ticking;
  }

  isCompleted(): boolean {
    return this.completed;
  }

  formatTimeLeft(): void {
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
    }

    const daysLeft = Math.floor(this.timeLeft / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((this.timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((this.timeLeft % (1000 * 60)) / 1000);

    const formattedDays = daysLeft < 10 ? `0${daysLeft}` : `${daysLeft}`;
    const formattedHours = hoursLeft < 10 ? `0${hoursLeft}` : `${hoursLeft}`;
    const formattedMinutes = minutesLeft < 10 ? `0${minutesLeft}` : `${minutesLeft}`;
    const formattedSeconds = secondsLeft < 10 ? `0${secondsLeft}` : `${secondsLeft}`;

    this.formattedTimeLeft = `${formattedMinutes}:${formattedSeconds}`;

    if (formattedHours !== '00' || formattedDays !== '00') {
      this.formattedTimeLeft = `${formattedHours}:` + this.formattedTimeLeft;
    }

    if (formattedDays !== '00') {
      this.formattedTimeLeft = `${formattedDays}:` + this.formattedTimeLeft;
    }
  }

  setDasharray(): void {
    const rawFraction = this.timeLeft / this.duration;
    const fraction = rawFraction - (1 / this.duration) * (1 - rawFraction);
    const remaining = Math.round(fraction * this.fullDasharray);

    this.dasharray = `${remaining} ${this.fullDasharray}`;
  }
}
