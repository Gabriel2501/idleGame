import { IMenuItem } from './menuItem';

export interface IUpgradeItem extends IMenuItem{
    effectType: string,
    effectPower: number
}