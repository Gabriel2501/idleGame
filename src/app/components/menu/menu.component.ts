import { IMenuItem } from './../../core/interfaces/menuItem';
import { PlayerStatsService } from './../../core/services/player-stats.service';
import { IPlayerStats } from './../../core/interfaces/playerStats';
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
  asyncStats: Observable<IPlayerStats>;

  constructor(
    private menuService: MenuService,
    private playerStatsService: PlayerStatsService
  ) {
    this.asyncTabs = menuService.getTabList();
    this.asyncStats = menuService.getPlayerStats();

    this.menuService.updateTabList();
    this.menuService.updatePlayerStats();
  }

  ngOnInit(): void {

  }

  getTooltip(item: IMenuItem) {
    return `
      ${item.name}
      ${item.description}
      $${item.price}
    `;
  }

  /**
   * 
   * @param label Pode ser 'Shop', 'Upgrades', ou 'Power Plants'
   * @param item 
   */
  handleMenuClick(label: string, item: IMenuItem) {
    switch (label) {
      case 'Shop':
        document.querySelectorAll(".shopItem").forEach(button => button.classList.remove("selected"));
        document.querySelector(`#id${item.id}`)?.classList.add("selected");

        this.menuService.setSelectedShopItem(item);
        break;
      case 'Upgrades':

        break;
      case 'Reincarnation':

        break;
    }
    console.log(item);
  }

  isAffordable(item: IMenuItem) {
    return this.playerStatsService.getBalance() >= item.price;
  }

}
