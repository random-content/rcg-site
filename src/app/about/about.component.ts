import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpContent, WpUser } from '../core';
import { LoadingService } from '../shared';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  about: WpContent;
  users: WpUser[];

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.endLoading();

    this.about = this.route.snapshot.data.about;
    this.users = this.route.snapshot.data.users;
  }

  twitterUrl(user) {
    if (user.twitter) {
      const baseUrl = 'https://twitter.com';
      const path = user.twitter.substring(1);

      return `${baseUrl}/${path}`;
    }
  }
}
