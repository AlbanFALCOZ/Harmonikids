import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class LevelFixture extends E2EComponentFixture {
    
    getLevelCard() {
        return this.page.locator("app-niveau-card");
    }
}
