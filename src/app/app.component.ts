import { Component } from '@angular/core';
import { navigateUrl } from './shared/utils/navigate-url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'github-finder';
  navigateUrl = navigateUrl;
}
