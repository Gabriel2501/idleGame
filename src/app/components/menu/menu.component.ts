import { IShopItem } from './../../core/interfaces/IShopItem';
import { ITab } from '../../core/interfaces/tab';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'idle-game-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  asyncTabs: Observable<ITab[]>;

  constructor(private menuService: MenuService) {
    this.asyncTabs = menuService.getTabList();
    this.menuService.updateTabList();
  }

  ngOnInit(): void {

  }

  getTooltip(item: IShopItem) {
    return `
      ${item.name}
      $${item.price}
    `;
  }

  /**
   * 
   * @param label Pode ser 'Shop', 'Upgrades', ou 'Power Plants'
   * @param item 
   */
  handleMenuClick(label: string, item: IShopItem) {
    console.log(label);
    console.log(item);
  }

}
