import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'idle-game';

  constructor() {
    window.oncontextmenu = (ev: MouseEvent) => ev.preventDefault();
    window.onselectstart = (ev: Event) => ev.preventDefault();
  }
}
