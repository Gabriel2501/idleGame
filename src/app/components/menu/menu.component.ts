import { IShopItem } from './../../core/interfaces/shopItem';
import { IUpgradeItem } from './../../core/interfaces/upgradeItem';
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
    this.asyncStats = playerStatsService.getPlayerStats();

    this.playerStatsService.initiateStats();
    this.menuService.initiateTabList();

    this.asyncStats.subscribe(_ => this.menuService.updateTabs());

    this.asyncTabs.subscribe(tabs => {
      tabs[0].contentShop?.forEach(item => item.disabled = this.playerStatsService.getPlayerCurrentStats().balance < item.price);
      tabs[1].contentUpgrade?.forEach(item => item.disabled = this.playerStatsService.getPlayerCurrentStats().balance < item.price);
      tabs[2].contentReset?.forEach(item => item.disabled = this.playerStatsService.getPlayerCurrentStats().balance < item.price);
      this.updateSelectedClass(tabs[0].contentShop);
    });
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
        let addClassToSelected = true;
        if (document.querySelector(`#id${item.id}`)?.classList.contains("selected")) {
          addClassToSelected = false;
          this.menuService.removeSelectedShopItem();
        }
        document.querySelectorAll(".shopItem").forEach(button => button.classList.remove("selected"));
        if (addClassToSelected) {
          document.querySelector(`#id${item.id}`)?.classList.add("selected");
          this.menuService.setSelectedShopItem(item as IShopItem);
        }
        break;
      case 'Upgrades':
        this.playerStatsService.buyUpgrade(item as IUpgradeItem);
        break;
      case 'Reincarnation':

        break;
    }
  }

  updateSelectedClass(contentShop?: IShopItem[]) {
    contentShop?.forEach(item => {
      item.disabled = this.playerStatsService.getPlayerCurrentStats().balance < item.price;
      if (item.disabled) document.querySelector(`#id${item.id}`)?.classList.remove("selected");
    });
  }
}

