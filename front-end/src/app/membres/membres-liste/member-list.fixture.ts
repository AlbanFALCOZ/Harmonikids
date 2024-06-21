import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class AddMembreFixture extends E2EComponentFixture {

    getAddNewEnfantButton() {
        return this.page.getByText('add');
    }

    getNomInput() {
        return this.page.locator('#lastName');
    }

    getPrenomInput() {
        return this.page.locator('#firstName');
    }

    getAgeInput() {
        return this.page.getByLabel('Age:');
    }

    getDescriptionInput() {
        return this.page.getByLabel('Description:');
    }

    getSubmitButton() {
        return this.page.getByRole('button', { name: 'Ajouter' });
    }

    async addEnfant(nom: string, prenom: string, age: string, description: string) {
        await this.getAddNewEnfantButton().click();
        await this.getNomInput().fill(nom);
        await this.getPrenomInput().fill(prenom);
        await this.getAgeInput().fill(age);
        await this.getDescriptionInput().fill(description);
        await this.getSubmitButton().click();
        //await this.page.pause();
    }

    chooseAlice() {
        return this.page.locator('div').filter({ hasText: 'Nom : RoutinePrénom : AliceÂge : 8 ansJ\'aime lire !' }).nth(2)
    }


    chooseLeo() {
        return this.page.locator('div').filter({ hasText: 'Nom : VivacePrénom : LéoÂge : 10 ansJe veux gagner !!!' }).nth(2)
    }

    goConfAlice(){
        return this.page.locator('img').nth(1);
    }

    goParamAlice(){
        return this.page.getByRole('link', { name: 'Paramètres' });
    }

    getAliceId(){
        return this.page.locator('div').filter({ hasText: 'Nom : RoutinePrénom : AliceÂge : 8 ansJ\'aime lire !' }).nth(2)
    }
}
