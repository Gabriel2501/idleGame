import { IShopItem } from './shopItem';
export interface IBoardSquare {
    isEmpty: boolean,
    positionX: number,
    positionY: number,
    item?: IShopItem
}