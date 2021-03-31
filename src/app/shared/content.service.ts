import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient,
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
      .pipe(map((res: WpContent) => {
        this.pageCache[id] = res;
        return res;
      }));
  }

  getUsers(): Observable<WpUser[]> {
    if (this.cachedUsers) {
      return of(this.cachedUsers);
    }

    this.loadingService.startLoading();
    return this.http.get(`${this.url}/users`)
      .pipe(map((res: WpUser[]) => {
        this.cachedUsers = res;
        return res;
      }));
  }

  getRepos(): Observable<GithubRepo[]> {
    if (this.cachedRepos) {
      return of(this.cachedRepos);
    }

    this.loadingService.startLoading();
    return this.http.get(`${this.url}/repos`)
      .pipe(map((res: GithubRepo[]) => {
        this.cachedRepos = res;
        return res;
      }));
  }
}
