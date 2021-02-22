import { IShopItem } from './../interfaces/shopItem';
import { ITab } from './../interfaces/tab';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private _tabList$: Subject<ITab[]>;
  private _tabs: ITab[];

  private _selectedShopItem!: IShopItem;

  constructor() {
    this._tabList$ = new Subject();
    this._tabs = [
      {
        label: 'Shop', contentShop: [
          { id: 0, name: 'Solar Panel', description: 'The most environmental-friendly option you can have! Does not produce any heat to the chamber.', price: 10, moneyProduction: 1, heatProduction: 0, duration: 15 },
          { id: 1, name: 'Uranium Cell', description: 'A single uranium cell. Produces 5$/s but emits 1 heat/s aswell.', price: 100, moneyProduction: 5, heatProduction: 1, duration: 30 },
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
          { id: 0, name: 'Increase Chamber Size', description: 'Adds a row and a column to the chamber, simple as that!', price: 10, effectType: 'addBoardSize', effectPower: 1 },
        ]
      },
      {
        label: 'Reincarnation', contentReset: [
          { id: 0, name: 'Content 3', description: 'Description 1', price: 16 }
        ]
      },
    ];
  }

  getTabList() {
    return this._tabList$;
  }

  initiateTabList() {
    setTimeout(() => this._tabList$.next(this._tabs), 1);
  }

  updateTabs() {
    this._tabList$.next(this._tabs);
  }

  setSelectedShopItem(item: IShopItem) {
    this._selectedShopItem = item;
  }

  getSelectedShopItem() {
    return this._selectedShopItem;
  }

  removeSelectedShopItem() {
    this._selectedShopItem = <IShopItem>{};
  }
}
