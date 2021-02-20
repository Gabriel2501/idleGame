import { IResetItem } from './resetItem';
import { IUpgradeItem } from './upgradeItem';
import { IShopItem } from './shopItem';

export interface ITab {
    label: string,
    contentShop?: IShopItem[],
    contentUpgrade?: IUpgradeItem[],
    contentReset?: IResetItem[]
}