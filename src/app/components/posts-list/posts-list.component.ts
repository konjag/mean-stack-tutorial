import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PageTitleService } from '../../services/page-title.service';
import Post from '../../models/post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html'
})
export class PostsListComponent {
  postsList: Post[];

  constructor(
    private postService: PostService,
    private pageTitleService: PageTitleService
  ) {
    postService.getPublishedPosts()
      .map((posts: Post[]) => {
        return posts.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      })
      .subscribe((posts: Post[]) => {
        this.postsList = posts;
      });

    pageTitleService.changeTitle('MEAN Blog');
  }
}
