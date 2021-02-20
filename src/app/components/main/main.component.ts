import { IPlayerStats } from './../../core/interfaces/playerStats';
import { Observable } from 'rxjs';
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

  public size: number;

  public board: Array<Array<IBoardSquare>>;

  private asyncStats: Observable<IPlayerStats>;

  constructor(
    private _playerStatsService: PlayerStatsService,
    private _menuService: MenuService
  ) {
    this.size = this._playerStatsService.getBoardSize();
    this.board = Array<Array<IBoardSquare>>();

    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];

      for (let j = 0; j < this.size; j++) {
        let square: IBoardSquare = { isEmpty: true, positionX: i, positionY: j };

        this.board[i][j] = square;
      }
    }

    this.asyncStats = _playerStatsService.getPlayerStats();
    this.asyncStats.subscribe(newPlayerStats => {
      this.size = newPlayerStats.size;
      for (let i = 0; i < this.size; i++) {
        if (!this.board[i]) this.board[i] = [];
        for (let j = 0; j < this.size; j++) {
          if (!this.board[i][j]) {
            let square: IBoardSquare = { isEmpty: true, positionX: i, positionY: j };
            this.board[i][j] = square;
          }
        }
      }
    });

  }

  ngOnInit(): void {

  }

  handleClick(item: IBoardSquare) {
    if (!item.item) {
      if (this._playerStatsService.buyShopItem(this._menuService.getSelectedShopItem())) {
        item.item = this._menuService.getSelectedShopItem();
        item.isEmpty = false;
        this.startLifeCycle(item);
      }
    }
  }

  getTooltip(item: IBoardSquare) {
    return (item.isEmpty) ? "" : this.generateToolTip(item.item);
  }

  generateToolTip(item?: IShopItem) {
    return item ?
      `
      ${item.name}
      $${item.moneyProduction}/s
      #${item.heatProduction}/s
      `
      : "Error";
  }

  startLifeCycle(square: IBoardSquare) {
    let item = square.item ? square.item : undefined;
    square.remainingTime = item?.duration ? item.duration : 0;
    document.querySelector(`#board${square.positionX}${square.positionY}`)?.classList.add("activated");
    square.remainingTimeBarValue = 100;
    let interval = setInterval(() => {
      this.progressBarInterval(square);
      if (square.remainingTime) {
        square.remainingTime--;
        square.remainingTimeBarValue = item?.duration ? square.remainingTime / item.duration * 100 : 0;
        this._playerStatsService.addMoney(item?.moneyProduction);
      }
      else {
        this.endLifeCycle(square);
        clearInterval(interval);
      }
    }, 1000);
  }

  endLifeCycle(square: IBoardSquare) {
    document.querySelector(`#board${square.positionX}${square.positionY}`)?.classList.remove("activated");
    square.isEmpty = true;
    square.item = undefined;
  }

  progressBarInterval(square: IBoardSquare) {
    square.progressBarValue = 0;
    let progressBarInterval = setInterval(() => {
      if (square.progressBarValue != undefined) {
        square.progressBarValue += 10;
        if (square.progressBarValue > 80) {
          clearInterval(progressBarInterval);
        }
      }
    }, 100);
  }

}
