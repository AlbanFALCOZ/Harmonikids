import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class HistoriqueFixture extends E2EComponentFixture {
  
  async getGames() {
        return await this.page.locator('.game').allInnerTexts();
  }

  async getRetourStat() {
    return this.page.locator('.retour_stat').filter({ hasText: "Retourner sur les statistiques" }).first();
  }
  


}