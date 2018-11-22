import { Component, Input } from '@angular/core';
import Post from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-admin-posts-list',
  templateUrl: './admin-posts-list.component.html'
})
export class AdminPostsListComponent {
  @Input() limit = null;
  postsList: Post[];

  constructor(
    private postService: PostService
  ) {
    postService.getPosts()
      .subscribe((posts: Post[]) => {
        this.postsList = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
  }

  onDeleteClick(id) {
    this.postService.deletePost(id)
      .subscribe(() => {
        this.postsList = this.postsList.filter((post) => post._id !== id);
      });
  }

}
