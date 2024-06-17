import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class QuestionListFixture extends E2EComponentFixture {

    getValidateButton() {
        return this.page.getByRole('button', { name: 'Valider' });
    }

    getTerminerButton() {
        return this.page.getByRole('button', { name: 'Terminer' });
    }
}
