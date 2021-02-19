import { IShopItem } from './../interfaces/shopItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {
  private _rows: number;
  private _cols: number;

  private _maxRows: number;
  private _maxCols: number;

  private _balance: number;

  private _selectedShopItem!: IShopItem;

  constructor() {
    this._rows = 5;
    this._cols = 5;
    this._maxRows = 16;
    this._maxCols = 16;
    this._balance = 120;
  }

  getRows() {
    return this._rows;
  }

  getCols() {
    return this._cols;
  }

  getBalance() {
    return this._balance;
  }
}
