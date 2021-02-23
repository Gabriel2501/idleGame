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

  private isLeftMouseDown: boolean;
  private isRightMouseDown: boolean;

  constructor(
    private _playerStatsService: PlayerStatsService,
    private _menuService: MenuService
  ) {
    this.isLeftMouseDown = false;
    this.isRightMouseDown = false;

    document.body.onmousedown = (ev) => {
      if (ev.button == 0) this.isLeftMouseDown = true;
      else if (ev.button == 2) this.isRightMouseDown = true;
    }
    document.body.onmouseup = (ev) => {
      if (ev.button == 0) this.isLeftMouseDown = false;
      else if (ev.button == 2) this.isRightMouseDown = false;
    }

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

    this.startChamber();

  }

  ngOnInit(): void {

  }

  startChamber() {
    setInterval(() => {
      this._playerStatsService.removeHeat(1);
      this._menuService.updateTabs(this._playerStatsService.getPlayerCurrentStats());
    }, 1000);
  }

  handleClick(item: IBoardSquare) {
    if (!item.item) {
      if (this._playerStatsService.buyShopItem(this._menuService.getSelectedShopItem())) {
        item.item = this._menuService.getSelectedShopItem();
        item.isEmpty = false;
        if (item.item.moneyProduction) this.startLifeCycle(item);
        else if (item.item.coolingPower) this.initRefrigerator(item);
      }
    }
  }

  handleRightClick(item: IBoardSquare, event?: MouseEvent) {
    if (event) event.preventDefault();

    if (item.item) {
      this._playerStatsService.sellShopItem(item);
      this.endLifeCycle(item);
    }
  }

  handleMouseHover(item: IBoardSquare) {
    if (this.isLeftMouseDown) this.handleClick(item);
    else if (this.isRightMouseDown) this.handleRightClick(item);
  }

  getTooltip(item: IBoardSquare) {
    return (item.isEmpty) ? "" : this.generateToolTip(item.item);
  }

  generateToolTip(item?: IShopItem) {
    if (item?.moneyProduction) return item ?
      `
      ${item.name}
      $${item.moneyProduction}/s
      #${item.heatProduction}/s

      Right-click to sell
      `
      : "Error";
    else if (item?.coolingPower) return item ?
      `
      ${item.name}
      Cools itself by ${item.coolingPower}/s

      Right-click to sell
      `
      : "Error";
    return "Error";
  }

  startLifeCycle(square: IBoardSquare) {
    let item = square.item ? square.item : undefined;
    square.remainingTime = item?.duration ? item.duration : 0;
    document.querySelector(`#board${square.positionX}${square.positionY}`)?.classList.add("activated");
    square.remainingTimeBarValue = 100;
    let interval = setInterval(() => {
      if (!square.isEmpty && square.remainingTime) {
        square.remainingTime--;
        square.remainingTimeBarValue = item?.duration ? square.remainingTime / item.duration * 100 : 0;
        this._playerStatsService.addMoney(item?.moneyProduction);
        if (item?.heatProduction) {
          let refrigerators: IBoardSquare[] = [];
          this.board.forEach(row => {
            refrigerators.push(...row.filter(boardItem => boardItem.item?.coolingPower));
          });

          refrigerators = refrigerators.filter(boardItem => (
            (
              (boardItem.positionX - 1 == square.positionX || boardItem.positionX + 1 == square.positionX)
              &&
              (boardItem.positionY == square.positionY)
            )
            ||
            (
              (boardItem.positionY - 1 == square.positionY || boardItem.positionY + 1 == square.positionY)
              &&
              (boardItem.positionX == square.positionX)
            )
          ));
          if (refrigerators.length) {
            refrigerators.forEach(refrigerator => (refrigerator.currentHeat != undefined && item?.heatProduction) ? refrigerator.currentHeat += item?.heatProduction / refrigerators.length : undefined);
          }
          else {
            if (this._playerStatsService.addHeat(item?.heatProduction)) this.explodeChamber();
          }
        }
      }
      if (square.isEmpty || !square.remainingTime) {
        setTimeout(() => {
          this.endLifeCycle(square);
          clearInterval(interval);
        }, 200);
      }
    }, 1000);
  }

  endLifeCycle(square: IBoardSquare) {
    document.querySelector(`#board${square.positionX}${square.positionY}`)?.classList.remove("activated");
    square.isEmpty = true;
    square.item = undefined;
  }

  initRefrigerator(square: IBoardSquare) {
    let item = square.item ? square.item : undefined;
    square.currentHeat = 0;
    let interval = setInterval(() => {
      if (item?.maxHeat && item?.coolingPower) {
        square.currentHeat = square.currentHeat ?? 0;

        if (square.currentHeat - item?.coolingPower > 0) square.currentHeat -= item.coolingPower;
        else square.currentHeat = 0;

        square.remainingTimeBarValue = square.currentHeat / item.maxHeat * 100;
        if (square.currentHeat > item?.maxHeat) {
          this.endLifeCycle(square);
          clearInterval(interval);
        }
      }
      if (square.isEmpty) {
        setTimeout(() => {
          this.endLifeCycle(square);
          clearInterval(interval);
        }, 200);
      }
    }, 1000);
  }

  explodeChamber() {
    this.board.forEach(row => row.forEach(square => square.isEmpty = true));
  }

}
