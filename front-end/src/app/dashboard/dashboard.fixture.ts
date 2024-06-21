
import { E2EComponentFixture } from 'e2e/e2e-component.fixture';

export class DashboardFixture extends E2EComponentFixture {
    getList() {
        return this.page.getByRole('link', { name: 'Vers la liste des quizs ➔' })
    }

    

}
