import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ErgoModeFixture extends E2EComponentFixture {

    getToggleModeButton() {
        return this.page.getByRole('button', { name: 'Mode Ergo' })
    }

    async activateErgoMode(password: string) {
        const modeButton=this.page.getByRole('button', { name: 'Mode Ergo : Off' })
        await modeButton.click();
        const ergoOn=this.page.locator('input[placeholder="Mot de passe"]')
        await ergoOn.click();
        const passwordInput=this.page.getByPlaceholder('Mot de passe')
        await passwordInput.fill(password);
        const connecter=this.page.getByRole('button', { name: 'Se connecter' })
        await connecter.click();
    }

    async deactivateErgoMode() {
        await this.getToggleModeButton().click();
    }

    async isErgoModeActivated() {
        const toggleButton = await this.getToggleModeButton();
        return (await toggleButton.innerText()).includes('On');
    }

    async isErgoModeDeactivated() {
        const toggleButton = await this.getToggleModeButton();
        return (await toggleButton.innerText()).includes('Off');
    }

    async goConfig() {
        const goConf = this.page.locator('app-navbar span');
        return await goConf.click();
    }

    async selectConfig() {
        const selectConf = this.page.getByRole('link', { name: 'Paramètres' });
        return await selectConf.click();
    }

    async selectProfile() {
        const selectProf = this.page.getByRole('link', { name: 'Profil' });
        return await selectProf.click();
    }

    getButtonStat() {
        return this.page.getByRole('button', { name: 'Statistiques' });
    }
}
