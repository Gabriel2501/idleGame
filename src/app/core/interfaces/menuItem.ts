export interface IMenuItem {
    id: number,
    name: string,
    description: string,
    price: number,
    disabled?: boolean,
    unlocked?: boolean
}