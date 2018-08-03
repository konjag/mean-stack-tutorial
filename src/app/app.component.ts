import { Component } from '@angular/core';
import { PageTitleService } from './services/page-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'MEAN Blog';

  constructor(
    private pageTitleService: PageTitleService
  ) {
    pageTitleService.titleChanged$
      .subscribe(title => {
        this.title = title;
      });
  }

}
