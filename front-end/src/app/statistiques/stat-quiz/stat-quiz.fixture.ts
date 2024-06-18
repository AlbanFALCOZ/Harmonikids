import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StatQuizFixture extends E2EComponentFixture {
  

    async getQuizName() {
        return await this.page.locator('.quiz-title').allInnerTexts();
    }

    async getCorrectFirstAttemptCount() {
        return await this.page.locator('.number-quiz').allInnerTexts();
    }

    async getPercentage() {
        const expectedCorrectFirstAttemptCount = 5;
        const expectedTotalQuestions = 10; 
        return (expectedCorrectFirstAttemptCount / expectedTotalQuestions) * 100;
    }

}