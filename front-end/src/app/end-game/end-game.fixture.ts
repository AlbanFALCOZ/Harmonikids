import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class EndGameFixture extends E2EComponentFixture {
    getButton() {
        return this.page.getByRole('button', { name: 'Retourner vers les quiz' });
    }
}




