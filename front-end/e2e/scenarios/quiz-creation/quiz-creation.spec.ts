import { test, expect } from '@playwright/test';
import { testUrl, quizListUrl } from 'e2e/e2e.config';
import { AppComponent } from 'src/app/app.component';
import { AppFixtureQuizAdd } from 'src/app/quizzes/quiz-add/quiz-add.fixture';
import { QuizListFixture } from 'src/app/quizzes/quiz-list/quiz-list.fixture';

test.describe('Initial test display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(quizListUrl);
    const appComponentFixture = new AppFixtureQuizAdd(page);
    const bouton = appComponentFixture.getAddButton();
    const quizListFixture = new QuizListFixture(page);
    const buttonAdmin = quizListFixture.getAdminButton();
    await buttonAdmin.click();

    const inputPasswordAdmin = quizListFixture.getInputPassword();
    await inputPasswordAdmin.fill("admin");

    const buttonLogIn = quizListFixture.getButtonLogIn();
    await buttonLogIn.click();

    await bouton.click()
    
    const titre = page.getByLabel('Titre du quiz:')
    await titre.fill('Titre du quiz');
    const theme = page.locator('#addQuizForm #quizTheme');
    await theme.selectOption({ index: 1 })
    const description = page.getByLabel("Description:");
    await description.fill('Description du quiz');
    const ajouterUnenouvelleQuestion = page.getByRole('button', { name: 'Questions' })
    await ajouterUnenouvelleQuestion.click();
    const titreDeLaQuestion = page.getByLabel('Titre :')
    await titreDeLaQuestion.fill('Que font 3+6')
    const niveau = page.getByRole('combobox', { name: 'Niveau :' });
    await niveau.selectOption({ index: 1 });
    const ajouterUnIndice = page.getByRole('button', { name: 'Ajouter un indice' })
    await ajouterUnIndice.click();
    const indiceTextuel = page.getByRole('textbox', { name: 'Indice :' })
    await indiceTextuel.fill('Tu peux compter avec tes doigts')
    const validerAjoutIndice = page.getByRole('button', { name: 'Ajouter' }).first()
    await validerAjoutIndice.click();
    const ajouterDesReponses = page.getByRole('button', { name: 'Ajouter des réponses' })
    await ajouterDesReponses.click();
    const checkboxCorrectPourLaPremiereReponse = page.locator('#checkbox1')
    await checkboxCorrectPourLaPremiereReponse.click()
    const inputReponse1 = page.locator('#ReponseText1')
    await inputReponse1.fill('9');
    const inputReponse2 = page.locator('#ReponseText2')
    await inputReponse2.fill('17')
    const ajouterUneNouvelleReponse = page.getByRole('button', { name: 'Ajouter une autre réponse' })
    await ajouterUneNouvelleReponse.click();
    const inputReponse3 = page.locator('#ReponseText3')
    await inputReponse3.fill('2')
    await page.getByText('Correct').nth(2).click();
    await page.getByText('Correct').nth(2).click();
    await ajouterUneNouvelleReponse.click();
    
    const validerAjoutDeReponse = page.getByRole('button', { name: 'Valider' })
    await validerAjoutDeReponse.click();
    await page.getByText('×').nth(3).click();
    await validerAjoutDeReponse.click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    const ajouterUneImage = page.locator('input[name="image"]')
    await ajouterUneImage.click()
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('src/assets/img/addition.jpg');
    const validerAjoutDeQuestion = page.getByRole('button', { name: 'Ajouter', exact: true })
    await validerAjoutDeQuestion.click();
    const ajouterImageQuiz = page.locator('input[name="name-changed"]')
    const fileChooserPromise2 = page.waitForEvent('filechooser');
    await ajouterImageQuiz.click()
    const fileChooser2 = await fileChooserPromise2;
    await fileChooser2.setFiles( 'src/assets/img/addition.jpg');
    const creerQuiz = page.getByRole('button', { name: 'Créer le quiz' })
    await creerQuiz.click()
  });
});
