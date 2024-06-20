import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ConfigurationFixture extends E2EComponentFixture {

    async toggleSound() {
        const soundToggle = this.page.locator('.slider').first()
        await soundToggle.click();
        const soundToggle2 = this.page.locator('.slider').first()
        await soundToggle2.click();

    }



    async toggleMusic() {
        const musicToggle = this.page.locator('div').filter({ hasText: /^Musique$/ }).locator('label span');
        await musicToggle.click();
        const musicToggle2 = this.page.locator('div').filter({ hasText: /^Musique$/ }).locator('label span');
        await musicToggle2.click();
    }


    async toggleHint() {
        const hintToggle = this.page.locator('div').filter({ hasText: /^Indice$/ }).locator('label span')
        await hintToggle.click();
        const hintToggle2 = this.page.locator('div').filter({ hasText: /^Indice$/ }).locator('label span')
        await hintToggle2.click();
    }



    async selectTheme(themeName: string) {
        const themeCheckbox = this.page.getByText('Les animaux')
        if (!(await themeCheckbox.isChecked())) {
            await themeCheckbox.click();
        }
    }


}
