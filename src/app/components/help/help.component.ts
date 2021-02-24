import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'idle-game-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  selected = new FormControl(0);
  constructor() { }

  ngOnInit(): void {
  }

  changeTab(index: number) {
    this.selected.setValue(index);
  }

}
