
import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class QuizListFixture extends E2EComponentFixture {
    getButtons() {
        return this.page.getByRole("button", {name : 'Supprimer'});
    }

    clickFirstButton() {
        return this.getButtons().click();
    }

    getAdminButton() {
        return this.page.getByRole('button', { name: 'Mode Ergo : Off' });
    }

    getInputPassword() {
        return this.page.getByPlaceholder('Mot de passe');
    }

    getButtonLogIn() {
        return this.page.getByRole('button', { name: 'Se connecter' });
    }

}
