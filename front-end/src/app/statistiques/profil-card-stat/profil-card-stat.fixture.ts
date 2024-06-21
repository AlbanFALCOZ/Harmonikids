import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ProfilCardFixture extends E2EComponentFixture {


  getMemberName() {
    return this.page.getByText('Alice ROUTINE');
  }

  getMemberAge() {
    return this.page.getByText('8');
  }
  

}