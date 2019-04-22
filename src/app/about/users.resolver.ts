import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { WpUser } from '../core';
import { ContentService } from '../shared';

@Injectable()
export class UsersResolver implements Resolve<WpUser[]> {
  constructor(
    private contentService: ContentService
  ) {}

  resolve(): Observable<WpUser[]> {
    return this.contentService.getUsers();
  }
}
