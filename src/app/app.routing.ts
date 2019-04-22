import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { AboutResolver } from './about/about.resolver';
import { UsersResolver } from './about/users.resolver';
import { ContactResolver } from './contact/contact.resolver';
import { ProjectsResolver } from './projects/projects.resolver';
import { BlogHeaderResolver } from './blog/blog-header.resolver';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    resolve: {
      about: AboutResolver,
      users: UsersResolver
    }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    resolve: {
      projects: ProjectsResolver
    }
  },
  {
    path: 'blog',
    component: BlogComponent,
    resolve: {
      header: BlogHeaderResolver
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    resolve: {
      contact: ContactResolver
    }
  },
  {
    path: '',
    component: HomeComponent,
    // resolve: {
    //   about: AboutResolver,
    // }
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [
    AboutResolver,
    UsersResolver,
    ContactResolver,
    ProjectsResolver,
    BlogHeaderResolver
  ]
})
export class AppRoutingModule { }
