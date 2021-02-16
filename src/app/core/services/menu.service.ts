import { IShopItem } from './../interfaces/IShopItem';
import { ITab } from '../interfaces/tab';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _tabList$: Subject<ITab[]>;
  constructor() {
    this._tabList$ = new Subject();
  }

  getTabList() {
    return this._tabList$;
  }

  updateTabList() {
    setTimeout(() =>
      this._tabList$.next(
        [
          {
            label: 'Shop', content: [
              { name: 'Content 1', price: 12 }, { name: 'Content 12', price: 120 }, { name: 'Content 13', price: 130 }, { name: 'Content 14', price: 140 },
              { name: 'Content 15', price: 150 }, { name: 'Content 15', price: 150 }, { name: 'Content 15', price: 150 }, { name: 'Content 15', price: 150 },
            ]
          },
          { label: 'Upgrades', content: [{ name: 'Content 2', price: 14 }] },
          { label: 'Reincarnation', content: [{ name: 'Content 3', price: 16 }] },
        ]
      ), 1);
  }
}
