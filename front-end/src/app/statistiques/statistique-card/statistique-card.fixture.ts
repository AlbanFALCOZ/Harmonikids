import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StatThemeFixture extends E2EComponentFixture {
  async getThemeName() {
    return await this.page.locator('.theme-title').allInnerTexts();
  }

  async getCorrectNumberOfQuiz() {
    return await this.page.locator('.number-quiz').allInnerTexts();
  }

  async getPercentage() {
    const expectedCorrectFirstAttemptCount = 5;
    const expectedTotalQuestions = 10;
    return (expectedCorrectFirstAttemptCount / expectedTotalQuestions) * 100;
  }

}