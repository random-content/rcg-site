import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { GithubRepo } from '../core';
import { ContentService } from '../shared';

@Injectable()
export class ReposResolver implements Resolve<GithubRepo[]> {
  constructor(
    private contentService: ContentService
  ) {}

  resolve(): Observable<GithubRepo[]> {
    return this.contentService.getRepos();
  }
}
