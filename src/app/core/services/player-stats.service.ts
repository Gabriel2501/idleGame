import { IBoardSquare } from './../interfaces/boardSquare';
import { IShopItem } from './../interfaces/shopItem';
import { Subject } from 'rxjs';
import { IUpgradeItem } from './../interfaces/upgradeItem';
import { Injectable } from '@angular/core';
import { IPlayerStats } from '../interfaces/playerStats';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {

  private _maxSize: number;

  private _playerStats: IPlayerStats;
  private _playerStats$: Subject<IPlayerStats>;

  private _productionMultipliers: any[];

  constructor() {
    this._playerStats$ = new Subject();

    this._maxSize = 16;

    this._playerStats = {
      balance: 10,
      technology: 0,
      size: 10,
      currentHeat: 0,
      maxHeat: 100
    };

    this._productionMultipliers = [

    ];
  }

  initiateStats() {
    setTimeout(() => this._playerStats$.next(this._playerStats), 1);
  }

  getBoardSize() {
    return this._playerStats.size;
  }

  getPlayerCurrentStats() {
    return this._playerStats;
  }

  getPlayerStats() {
    return this._playerStats$;
  }

  buyShopItem(item: IShopItem) {
    if (this._playerStats.balance >= item.price) {
      this._playerStats.balance -= item.price;
      this._playerStats$.next(this._playerStats);
      return true;
    }
    return false;
  }

  sellShopItem(square: IBoardSquare) {
    let item = square.item ? square.item : <IShopItem>{};
    square.remainingTime = square.remainingTime ? square.remainingTime : 1;
    item.duration = item.duration ? item.duration : 1;
    this._playerStats.balance += Math.round(item.price * (square.remainingTime / item.duration));

    this._playerStats$.next(this._playerStats);
  }

  buyUpgrade(item: IUpgradeItem) {
    if (this._playerStats.balance >= item.price) {
      this._playerStats.balance -= item.price;
      this.applyUpgrade(item.effectType, item.effectPower);
    }

    this._playerStats$.next(this._playerStats);
  }

  applyUpgrade(type: string, power: number) {
    switch (type) {
      case 'addBoardSize':
        if (this._playerStats.size < this._maxSize) this._playerStats.size += power;
        break;
    }
  }

  addMoney(value?: number) {
    if (value) {
      this._playerStats.balance += value;
      this._playerStats$.next(this._playerStats);
    }
  }

  addHeat(value?: number) {
    if (value) {
      this._playerStats.currentHeat += value;
      if (this._playerStats.currentHeat >= this._playerStats.maxHeat) {
        return true;
      }
      this._playerStats$.next(this._playerStats);
    }
    return false;
  }

  removeHeat(value?: number) {
    if (value) {
      if (this._playerStats.currentHeat - value >= 0) {
        this._playerStats.currentHeat -= value;
        this._playerStats$.next(this._playerStats);
      }
    }
  }
}
