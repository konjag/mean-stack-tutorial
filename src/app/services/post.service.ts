import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import Post from '../models/post.model';

@Injectable()
export class PostService {
  postsUrl = `${environment.apiUrl}/posts`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  public getPosts(): Observable<Post[]> {
    return this.http
      .get(this.postsUrl)
      .map(response => response['data'] as Post[]);
  }

  public getPublishedPosts(): Observable<Post[]> {
    return this.getPosts()
      .map(posts =>  {
        return posts
          .filter(post => post.isPublished)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
  }

  public getPostById(id: string): Observable<Post> {
    return this.http
      .get(`${this.postsUrl}/${id}`)
      .map(response => response['data'] as Post);
  }

  public addPost(post: Post): Observable<Post> {
    return this.http
      .post<Post>(this.postsUrl, { data: post }, this.httpOptions);
  }

  public editPost(id: string, post: Post): Observable<Post> {
    return this.http
      .put<Post>(`${this.postsUrl}/${id}`, { data: post }, this.httpOptions);
  }

  public deletePost(id: string): Observable<Post> {
    return this.http
      .delete(`${this.postsUrl}/${id}`, this.httpOptions)
      .map(response => response['data'] as Post);
  }
}
