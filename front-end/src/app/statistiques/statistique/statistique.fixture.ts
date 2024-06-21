import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StatistiqueFixture extends E2EComponentFixture {

  getHistoryButton() {
    return this.page.locator('.button_history').filter({ hasText: "Voir l'historique des jeux" }).first();
  }

  getPlusButton() {
    return this.page.locator('.plus').filter({ hasText: "Voir plus" }).first();
  }


}