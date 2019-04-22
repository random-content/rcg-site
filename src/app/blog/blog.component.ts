import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { WpContent } from '../core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  header: WpContent;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.endLoading();

    this.header = this.route.snapshot.data.header;
  }

}
