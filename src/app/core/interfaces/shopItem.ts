import { IMenuItem } from './menuItem';

export interface IShopItem extends IMenuItem {
    moneyProduction?: number,
    heatProduction?: number,
    maxHeat?: number,
    duration?: number,
    heatRemovePower?: number
}