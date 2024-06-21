import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ProgresFixture extends E2EComponentFixture {


    async getPercentage() {
        return (await this.page.locator('.progress-circle__text').allInnerTexts()).find((text) => text.includes('%'));
    }


}