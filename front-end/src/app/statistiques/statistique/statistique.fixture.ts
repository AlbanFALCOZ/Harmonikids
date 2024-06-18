import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StatistiqueFixture extends E2EComponentFixture {

  getHistoryButton() {
    return this.page.getByRole('button', { name: "Voir l'historique des jeux" });
  }

  clickCreateButton(numberOfClick = 1) {
    return this.getHistoryButton().click({ clickCount: numberOfClick });
  }
  

}