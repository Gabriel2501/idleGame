import { PlayerStatsService } from './../../core/services/player-stats.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'idle-game-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private _rows: number;
  private _cols: number;

  public board: any[][];
  constructor(private _playerStats: PlayerStatsService) {
    this._rows = this._playerStats.getRows();
    this._cols = this._playerStats.getCols();
    this.board = Array<any>();

    for (let i = 0; i < this._rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this._cols; j++) {
        this.board[i][j] = "a";
      }
    }
  }

  ngOnInit(): void {

  }

}
