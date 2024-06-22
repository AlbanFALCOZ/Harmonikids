import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StatThemeFixture extends E2EComponentFixture {
  async getThemeName() {
    return await this.page.locator('.theme-title').allInnerTexts();
  }

  async getCorrectNumberOfQuiz() {
    return await this.page.locator('.number-quiz').allInnerTexts();
  }

}