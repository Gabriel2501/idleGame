import { IShopItem } from '../interfaces/shopItem';
import { ITab } from '../interfaces/tab';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPlayerStats } from '../interfaces/playerStats';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private _tabList$: Subject<ITab[]>;
  private _playerStats$: Subject<IPlayerStats>;
  private _selectedShopItem!: IShopItem;

  constructor() {
    this._tabList$ = new Subject();
    this._playerStats$ = new Subject();
  }

  getTabList() {
    return this._tabList$;
  }

  updateTabList() {
    setTimeout(() =>
      this._tabList$.next(
        [
          {
            label: 'Shop', contentShop: [
              { id: 0, name: 'Content 1', description: 'Description 1', price: 10 },
              { id: 1, name: 'Content 12', description: 'Description 1', price: 120 },
              { id: 2, name: 'Content 13', description: 'Description 1', price: 130 },
              { id: 3, name: 'Content 14', description: 'Description 1', price: 140 },

              { id: 4, name: 'Content 15', description: 'Description 1', price: 150 },
              { id: 5, name: 'Content 15', description: 'Description 1', price: 150 },
              { id: 6, name: 'Content 15', description: 'Description 1', price: 150 },
              { id: 7, name: 'Content 15', description: 'Description 1', price: 150 },
            ]
          },
          {
            label: 'Upgrades', contentUpgrade: [
              { id: 0, name: 'Content 2', description: 'Description 1', price: 14, effect: 1 }
            ]
          },
          {
            label: 'Reincarnation', contentReset: [
              { id: 0, name: 'Content 3', description: 'Description 1', price: 16 }
            ]
          },
        ]
      ), 1);
  }

  getPlayerStats() {
    return this._playerStats$;
  }

  updatePlayerStats() {
    setTimeout(() =>
      this._playerStats$.next(
        {
          balance: 120,
          technology: 0
        }
      ), 1000);
  }

  setSelectedShopItem(item: IShopItem) {
    this._selectedShopItem = item;
  }

  getSelectedShopItem() {
    return this._selectedShopItem;
  }
}
