import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SharedModule } from './shared.module';
import { WpContent, WpUser } from '../core';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: SharedModule
})
export class ContentService {
  private url = `${environment.apiRoot}/wp-json/wp/v2`;

  private pageCache: { [id: string]: WpContent };
  private cachedUsers: WpUser[];

  constructor(
    private http: Http,
    private loadingService: LoadingService
  ) {
    this.pageCache = {};
  }

  getPosts(): Observable<any> {
    return this.http.get(`${this.url}/posts`);
  }

  getPage(id): Observable<WpContent> {
    if (this.pageCache[id]) {
      return of(this.pageCache[id]);
    }

    this.loadingService.startLoading();
    return this.http.get(`${this.url}/pages/${id}`)
      .pipe(map((res) => {
        const data = res.json();
        const page = {
          title: data.title.rendered,
          content: data.content.rendered
        };

        this.pageCache[id] = page;

        return page;
      }));
  }

  getUsers(): Observable<WpUser[]> {
    if (this.cachedUsers) {
      return of(this.cachedUsers);
    }

    this.loadingService.startLoading();
    return this.http.get(`${this.url}/users?exclude=1`)
      .pipe(map((res) => {
        const response = res.json();

        const users: WpUser[] = [];
        response.forEach((user) => {
          const avatars = user.avatar_urls;
          users.push({
            id: user.id,
            name: user.name,
            description: user.description,
            linkedIn: user.url,
            twitter: user.meta.twitter,
            avatar: avatars['96'] || avatars['48'] || avatars['24']
          });
        });

        this.cachedUsers = users;

        return users;
      }));
  }
}
