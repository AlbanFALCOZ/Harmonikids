import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class AppFixtureQuizAdd extends E2EComponentFixture {

    getTitle() {
        return this.page.getByRole('heading', { name: 'Hello World!' });
    }

    getDescription() {
        return this.page.getByText('Start your first app!', { exact: true });
    }

    getShowButton() {
        return this.page.getByRole('button', { name: 'Show success!' });
    }

    getAddButton() {
        return this.page.getByText('add');
    }

    getBoxInput(){
        return this.page.getByLabel('Titre du quiz:')
    }

 

    clickOnShowButton() {
        return this.getShowButton().click();
    }

    getSuccessMessage() {
        return this.page.getByText('Wow!');
    }
}
