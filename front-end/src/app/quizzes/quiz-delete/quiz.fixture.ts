
import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class QuizDeleteFixture extends E2EComponentFixture {
    getButtonValider() {
        return this.page.getByRole("button", {name: "Valider"})
    }
}
