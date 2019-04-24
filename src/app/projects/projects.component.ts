import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { WpContent, GithubRepo } from '../core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: WpContent;
  repos: GithubRepo[];

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.endLoading();

    this.projects = this.route.snapshot.data.projects;
    this.repos = this.route.snapshot.data.repos;
  }

}
