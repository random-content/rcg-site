import { Component, OnInit } from '@angular/core';
import { LoadingService } from './shared';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingStatus } from './core';
import { Observable } from 'rxjs';
import { NavigationStart, Router, NavigationCancel } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: LoadingStatus = {
    active: false,
    fadeOut: false
  };

  private navStart: Observable<NavigationStart>;
  private navCancel: Observable<NavigationCancel>;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.navStart = this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ) as Observable<NavigationStart>;

    this.navCancel = this.router.events.pipe(
      filter((event) => event instanceof NavigationCancel)
    ) as Observable<NavigationCancel>;
  }

  ngOnInit() {
    this.matIconRegistry.addSvgIcon('logo', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/rcg-logo.svg'));
    this.matIconRegistry.addSvgIcon('github', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github-mark.svg'));

    this.loadingService.loadingStatus.subscribe((next) => {
      this.loading = next;
    });

    this.navCancel.subscribe(() => {
      this.loadingService.endLoading();
    });
  }
}
