import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import Post from '../models/post.model';

@Injectable()
export class PostService {
  postsUrl = `${environment.apiUrl}/posts`;

  constructor(
    private http: HttpClient
  ) { }

  public getPosts(): Observable<Post[]> {
    return this.http
      .get(this.postsUrl)
      .map(response => {
        return response['data'] as Post[];
      });
  }

  public getPublishedPosts(): Observable<Post[]> {
    return this.getPosts()
      .map(posts => posts.filter(post => post.isPublished));
  }

  public getPostById(id: string): Observable<Post> {
    return this.http
      .get(`${this.postsUrl}/${id}`)
      .map(response => {
        return response['data'] as Post;
      });
  }
}
