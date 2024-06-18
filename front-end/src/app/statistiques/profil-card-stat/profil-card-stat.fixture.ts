import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ProfilCardFixture extends E2EComponentFixture {

  getButton(name: string) {
    return this.page.getByRole('button', { name: name });
  }

  clickButton(name: string) {
    return this.getButton(name).click();
  }

  getMemberName() {
    return this.page.getByText('Alice ROUTINE');
  }

  getMemberAge() {
    return this.page.getByText('8');
  }

  getNumberOfStars() {
    return this.page.getByText('1000');
  }
  

}