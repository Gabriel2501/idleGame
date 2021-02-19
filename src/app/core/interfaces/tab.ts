import { IUpgradeItem } from './upgradeItem';
import { IShopItem } from './shopItem';
import { IResetItem } from './ResetItem';

export interface ITab {
    label: string,
    contentShop?: IShopItem[],
    contentUpgrade?: IUpgradeItem[],
    contentReset?: IResetItem[]
}