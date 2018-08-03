import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PostService } from './services/post.service';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostComponent } from './components/post/post.component';
import { TrimPipe } from './utils/trim.pipe';
import { HeaderComponent } from './components/header/header.component';
import { BlogDescriptionComponent } from './components/blog-description/blog-description.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import {PageTitleService} from './services/page-title.service';

const appRoutes: Routes = [
  { path: '', component: PostsListComponent, data: { hasTitle: false } },
  { path: 'post/:id', component: PostDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    PostComponent,
    TrimPipe,
    HeaderComponent,
    BlogDescriptionComponent,
    PostDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [PostService, PageTitleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
