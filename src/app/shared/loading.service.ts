import { Injectable, Inject, EventEmitter } from '@angular/core';
import { SharedModule } from './shared.module';
import { WINDOW } from './window.service';
import { DOCUMENT } from '@angular/common';
import { LoadingStatus } from '../core';

@Injectable({
  providedIn: SharedModule
})
export class LoadingService {
  private colors = [
    'orange',
    'green',
    'blue',
    'purple',
    'red'
  ];
  private initialLoad = true;
  private initialDelay = 100;
  private initialColorInterval = 300;
  private colorTransitionIntervals = [
    350,
    500,
    700
  ];
  private rippleDelay = 500;
  private fadeOutDelay = 700;
  private inactiveDelay = 600;
  private miniLoadInactiveDelay = 200;

  loadingStatus: EventEmitter<LoadingStatus> = new EventEmitter<LoadingStatus>();
  private _loadingStatus: LoadingStatus = {
    active: false,
    fadeOut: false
  };

  private fadeOutTimeout: any;
  private inactiveTimeout: any;

  constructor(
    @Inject(WINDOW) private window: any,
    @Inject(DOCUMENT) private document: Document
  ) { }

  startLoading() {
    if (this.fadeOutTimeout) {
      clearTimeout(this.fadeOutTimeout);
      this.fadeOutTimeout = null;
    }

    if (this.inactiveTimeout) {
      clearTimeout(this.inactiveTimeout);
      this.inactiveTimeout = null;
    }

    if (!this._loadingStatus.active && !this.initialLoad) {
      this._loadingStatus.active = true;
      this._loadingStatus.fadeOut = false;

      this.loadingStatus.emit(this._loadingStatus);
    }
  }

  endLoading() {
    if (this.initialLoad) {
      this.endInitialLoad();
      this.initialLoad = false;
    }

    if (this._loadingStatus.active) {
      this.endMiniLoad();
    }
  }

  private endMiniLoad() {
    this.fadeOutTimeout = setTimeout(() => {
      this._loadingStatus.fadeOut = true;
      this.loadingStatus.emit(this._loadingStatus);
    }, this.initialDelay);

    this.inactiveTimeout = setTimeout(() => {
      this._loadingStatus.fadeOut = false;
      this._loadingStatus.active = false;

      this.loadingStatus.emit(this._loadingStatus);
    }, this.initialDelay + this.miniLoadInactiveDelay);
  }

  private endInitialLoad() {
    setTimeout(() => {
      const loadingData = this.window.loadingData;

      loadingData.appLoaded = true;

      let currentColor = loadingData.activeColor;
      const lastChange = loadingData.lastColorChange;
      const loadingScreen = this.document.getElementById('loadingScreen');
      const loadingLogo = this.document.getElementById('loadingLogo');

      let totalTimeout = 0;
      for (let i = 0; i < this.colorTransitionIntervals.length; i++) {
        totalTimeout += this.colorTransitionIntervals[i];

        if (i === 0 && lastChange) { // aiming for a seamless slowdown
          totalTimeout += Date.now() - lastChange - this.initialColorInterval;
        }

        setTimeout(() => {
          let nextColor = this.getRandomColor();
          while (nextColor === currentColor) {
            nextColor = this.getRandomColor();
          }

          if (currentColor) {
            loadingLogo.classList.replace(currentColor, nextColor);
          } else {
            loadingLogo.classList.remove(...this.colors);
            loadingLogo.classList.add(nextColor);
          }

          currentColor = nextColor;

          if (i === this.colorTransitionIntervals.length - 1) {
            this.document.body.classList.add(currentColor);
          }
        }, totalTimeout);
      }

      totalTimeout += this.rippleDelay; // start the ripple
      setTimeout(() => {
        loadingLogo.classList.remove(...this.colors);
        loadingScreen.classList.remove('ripple');
      }, totalTimeout);

      totalTimeout += this.fadeOutDelay; // start the fade out
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
      }, totalTimeout);

      totalTimeout += this.inactiveDelay; // remove the screen
      setTimeout(() => {
        loadingScreen.classList.add('inactive');
      }, totalTimeout);
    }, this.initialDelay);
  }

  private getRandomColor(): string {
    const index = Math.floor(Math.random() * this.colors.length);

    return this.colors[index];
  }
}
