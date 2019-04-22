import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { WpContent, Pages } from '../core';
import { ContentService } from '../shared';

@Injectable()
export class ContactResolver implements Resolve<WpContent> {
  constructor(
    private contentService: ContentService
  ) {}

  resolve(): Observable<WpContent> {
    return this.contentService.getPage(Pages.CONTACT);
  }
}
