import { Component, Input } from '@angular/core';
import Post from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent {
  @Input() post: Post;
}
