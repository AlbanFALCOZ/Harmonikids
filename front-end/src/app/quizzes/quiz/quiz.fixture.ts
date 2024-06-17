import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class QuizFixture extends E2EComponentFixture {
    getChooseButton() {
        return this.page.getByRole('button', { name: 'Choisir' });
       }
     
       clickCreateButton() {
         return this.getChooseButton().click();
       }

}
