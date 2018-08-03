import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PageTitleService {

  private titleChangedSource = new Subject<string>();

  titleChanged$ = this.titleChangedSource.asObservable();

  changeTitle(title: string) {
    this.titleChangedSource.next(title);
  }

}
