import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class MultiChoiceFixture extends E2EComponentFixture {

    getWrongAnswer() {
        return this.page.getByRole('button', { name: '2' });
    }

    getRightAnswer() {
        return this.page.getByRole('button', { name: '1' });
    }
}
