import { IShopItem } from './../../core/interfaces/shopItem';
import { MenuService } from 'src/app/core/services/menu.service';
import { IBoardSquare } from './../../core/interfaces/boardSquare';
import { PlayerStatsService } from './../../core/services/player-stats.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'idle-game-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public rows: number;
  public cols: number;

  public board: Array<Array<IBoardSquare>>;

  constructor(
    private _playerStats: PlayerStatsService,
    private _menuService: MenuService
  ) {
    this.rows = this._playerStats.getRows();
    this.cols = this._playerStats.getCols();
    this.board = Array<Array<IBoardSquare>>();

    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];

      for (let j = 0; j < this.cols; j++) {
        let square: IBoardSquare = { isEmpty: true, positionX: i, positionY: j };

        this.board[i][j] = square;
      }
    }
  }

  ngOnInit(): void {

  }

  handleClick(item: IBoardSquare) {
    item.item = this._menuService.getSelectedShopItem();
    item.isEmpty = false;

    console.log(item.item);
  }

  getTooltip(item: IBoardSquare) {
    return (item.isEmpty) ? "" : this.generateToolTip(item.item);
  }

  generateToolTip(item: IShopItem | undefined) {
    return item ?
      `
      ${item.name}
      ${item.description}
      `
      : "Error";
  }
}
