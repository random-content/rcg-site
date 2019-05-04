import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SharedModule } from './shared.module';
import { WpContent, WpUser, GithubRepo } from '../core';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: SharedModule
})
export class ContentService {
  private url = environment.apiRoot;

  private pageCache: { [id: string]: WpContent };
  private cachedUsers: WpUser[];
  private cachedRepos: GithubRepo[];

  constructor(
    private http: Http,
    private loadingService: LoadingService
  ) {
    this.pageCache = {};
  }

  // getPosts(): Observable<any> {
  //   return this.http.get(`${this.url}/posts`);
  // }

  getPage(id): Observable<WpContent> {
    if (this.pageCache[id]) {
      return of(this.pageCache[id]);
    }

    this.loadingService.startLoading();
    return this.http.get(`${this.url}/pages/${id}`)
      .pipe(map((res) => {
        const page = res.json();
        this.pageCache[id] = page;
        return page;
      }));
  }

  getUsers(): Observable<WpUser[]> {
    if (this.cachedUsers) {
      return of(this.cachedUsers);
    }

    this.loadingService.startLoading();
    return this.http.get(`${this.url}/users`)
      .pipe(map((res) => {
        const users = res.json();
        this.cachedUsers = users;
        return users;
      }));
  }

  getRepos(): Observable<GithubRepo[]> {
    if (this.cachedRepos) {
      return of(this.cachedRepos);
    }

    this.loadingService.startLoading();
    return this.http.get(`${this.url}/repos`)
      .pipe(map((res) => {
        const repos = res.json();
        this.cachedRepos = repos;
        return repos;
      }));
  }
}
