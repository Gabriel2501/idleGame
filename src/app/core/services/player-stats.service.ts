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
      size: 5
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

  addMoney(value: number | undefined) {
    if (value) {
      this._playerStats.balance += value;
      this._playerStats$.next(this._playerStats);
    }
  }
}
