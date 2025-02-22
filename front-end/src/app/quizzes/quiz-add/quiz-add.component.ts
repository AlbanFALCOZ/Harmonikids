import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Quiz } from 'src/models/quiz.model';
import { Theme } from 'src/models/theme.model';
import { Answer, Question, QuestionType } from 'src/models/question.model';
import { QuizService } from 'src/services/quiz.service';
import { ThemeService } from 'src/services/theme.service';
import { QuestionService } from 'src/services/question.service';
import { QuestionAddComponent } from 'src/app/questions/question-add/question-add.component'

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.scss']
})
export class QuizAddComponent implements OnInit {


  @ViewChild('answerInputs', { static: false }) answerInputs!: ElementRef<HTMLInputElement>;
  src: string | undefined;
  themeList: Theme[] = [];
  quizList: Quiz[] = [];
  showQuizzes = false;
  showQuestionsAdd = false;
  showHintAdd = false;
  QuizList: Quiz[] = [];
  questionList: Question[] = [];
  displayForm = false;
  newQuizQuestionList: Question[] = [];
  selectedQuiz: any = null;
  selectedQuestions: Set<string> = new Set();
  displayFormUpdate = false;
  displayFormDelete = false;
  showQuestionPopup: boolean = false;
  showAnswerAdd: boolean = false;
  answers: string[] = ['', '', '', ''];
  correctAnswers: boolean[] = [false, false, false, false];

  answerList: Answer[] = [];

  hint: { text?: string | undefined; imageUrl?: string | undefined; };

  constructor(public quizService: QuizService, private themeService: ThemeService, private questionService: QuestionService) {

    this.quizService = quizService;
    this.questionService = questionService;
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
    this.questionService.questions$.subscribe((questions: Question[]) => {
      this.questionList = questions;
    });
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.hint = { text: '' }
    this.answers = ['', ''];
  }

  ngOnInit(): void {
    
  }

  addAnswer() {
    if (this.answers.length < 4) {
      this.answers.push('')
      this.correctAnswers.push(false);
    }
  }

  removeAnswer() {
    if (this.answers.length > 2) {
      this.answers.pop();
      this.correctAnswers.pop();
    }
  }

  hasMoreThanTwoAnswers(): boolean {
    return this.answerList.length >= 2;
  }

  answerListAdd() {
    this.answerList = [];
    for (let i = 1; i <= 4; i++) {
      const inputElement = document.getElementById(`ReponseText${i}`) as HTMLInputElement;
      const checkboxElement = document.getElementById(`checkbox${i}`) as HTMLInputElement;
      if (inputElement) {
        if (inputElement.value == '') {
          this.displayMessage('Une réponse est vide');
          return;
        }
        const newAnswer: Answer = {
          value: inputElement.value,
          isCorrect: checkboxElement.checked,

        };
        this.answerList.push(newAnswer);
      } else {
        console.error(`Element with ID "ReponseText${i}" or checkbox "checkbox${i}" not found.`);
      }
    }
    if (!this.hasCorrectAnswer()) {
      this.displayMessage('Au moins une réponse correcte est requise.');
      return;
    }
    this.toggleAnswerAdd();
    this.displayMessage('Les réponses ont été ajoutée à la question');
  }

  getInputValueById(id: string): string | undefined {
    const inputElement = this.answerInputs.nativeElement.querySelector(`#${id}`) as HTMLInputElement;
    return inputElement?.value;
  }

  displayModal() {
    var modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "block";

      window.onclick = function (event) {
        if (event.target == modal && (modal)) {
          modal.style.display = "none";
        }
      }
    }
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "none";
    }
  }

  closeQuestionPopup() {
    this.showQuestionPopup = false;
    this.selectedQuiz = null;
  }

  submitForm(form: NgForm): void {
    const quizTitle = form.value.quizTitle;
    const quizTheme = form.value.quizTheme;
    const quizDescription = form.value.quizDescription;
    const quizQuestions = this.newQuizQuestionList;
    const quizImage = this.src;
    form.resetForm();
    this.closeModal();
  }

  valueChanged(files: FileList) {
    if (files.length !== 1) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => (this.src = reader.result as string);

  }

  toggleQuiz() {
    this.showQuizzes = !this.showQuizzes;
  }

  selectQuiz(quiz: any) {
    this.selectedQuiz = quiz;
    this.showQuestionPopup = !this.showQuestionPopup;
    this.selectedQuestions.clear();

  }

  toggleQuestionPopup() {
    this.showQuestionPopup = !this.showQuestionPopup;
  }

  toggleAnswerAdd() {
    this.showAnswerAdd = !this.showAnswerAdd;
  }

  onQuestionToggle(question: Question, event: any) {
    if (event.target.checked) {
      this.newQuizQuestionList.push(question);
    } else {
      this.newQuizQuestionList = this.newQuizQuestionList.filter(item => item !== question);
    }
  }

  isQuestionSelected(question: string) {
    return this.selectedQuestions.has(question);
  }

  generateQuizId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  readFile(file: File): string {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      return reader.result as string;
    };
    reader.onerror = () => {
      console.error("Error reading file");
      return '';
    };
    return '';
  }

  toggleQuestionsAdd() {
    this.showQuestionsAdd = !this.showQuestionsAdd;
  }

  toggleHintAdd() {
    this.showHintAdd = !this.showHintAdd;
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

  toggleFormUpdate() {
    this.displayFormUpdate = !this.displayFormUpdate;
    this.showQuestionsAdd = false;
  }

  toggleFormDelete() {
    this.displayFormDelete = !this.displayFormDelete;
  }

  hasCorrectAnswer(): boolean {
    return this.answerList.some(answer => answer.isCorrect === true);
  }

  hasNoAnswerEmpty(): boolean {
    return this.answerList.some((answer) => answer.value === "");
  }

  submitFormQuestion(form: NgForm): void {
    const label = form.value.label;
    const typeOfQuestion = QuestionType.MultipleChoice;
    const niveau = form.value.niveau;
    const image = this.src;
    const quizId = form.value.quizId;
    const hint = this.hint || this.src;
    const answers = this.answerList;
    
    if (hint.text === "") {
      this.displayMessage("Vous n'avez pas ajouté d'indice");
      return ;
    }


    if (answers.length == 0 || !this.hasCorrectAnswer() || !this.hasMoreThanTwoAnswers()) {
      this.displayMessage("Vous n'avez pas créé de questions");
      return ;
    }

    if (form.valid) {
      const newQuestion: Question = {
        label: label,
        typeOfQuestion: typeOfQuestion,
        niveau: niveau,
        image: image || '',
        quizId: quizId,
        answers: answers,
        hint: this.hint || this.src,
        id: 0
      };

      this.newQuizQuestionList.push(newQuestion);
      this.answers = ['', '']
      this.answerList = [];
      this.hint = { text: '', imageUrl: '' };
      this.toggleQuestionsAdd();
      this.correctAnswers = [false, false, false, false];
      this.displayMessage('La question a bien été ajoutée au nouveau quiz');
      form.resetForm();
    }
  }

  question: Question = {
    id: 1,
    label: '',
    typeOfQuestion: QuestionType.MultipleChoice,
    niveau: '',
    answers: [{ id: 1, value: '', isCorrect: false }],
    hint: { text: '', imageUrl: '' },
    quizId: 0
  };

  setHint() {
    const inputElement = document.getElementById('hintText') as HTMLInputElement;
    if (inputElement) {
      const textValue = inputElement.value;
      const imageUrl = this.hint.imageUrl;

      if (textValue && !imageUrl) {
        this.hint = { text: textValue };
        this.displayMessage('L\'indice a bien été ajouté');
      } else if (!textValue && imageUrl) {
        this.hint = { imageUrl: imageUrl };
        this.displayMessage('L\'indice a bien été ajouté');
      } else if (textValue && imageUrl) {
        this.hint = { text: textValue, imageUrl: imageUrl };
      } else {
        console.error('Aucun contenu saisi.');
        return;
      }
      this.toggleHintAdd();
    } else {
      return;
    }
  }

  submitFormQuiz(form: NgForm): void {
    const quizTitle = form.value.quizTitle;
    const quizTheme = form.value.quizTheme;
    const quizDescription = form.value.quizDescription;
    const quizImage = this.src || 'a';
    const selectedQuestions = this.newQuizQuestionList;

    if (form.valid) {
      const newQuiz: Quiz = {
        name: quizTitle,
        description: quizDescription,
        theme: quizTheme,
        questions: selectedQuestions,

        statut: 'A faire',
        image: quizImage || '',

        id: 0
      };

      this.quizService.addQuiz(newQuiz).subscribe(
        (createdQuiz) => {
          const quizId = createdQuiz.id;
          this.newQuizQuestionList.forEach((question) => {
            const questionToCreate = {
              label: question.label,
              typeOfQuestion: question.typeOfQuestion,
              niveau: question.niveau,
              image: question.image,
              answers: question.answers,
              hint: question.hint,
              quizId: quizId,
              id: 0
            };
            this.questionService.createQuestion(quizId, questionToCreate).subscribe(
              (createdQuestion) => {
                this.newQuizQuestionList.push(createdQuestion);
                this.displayMessage('Le quiz a été créé avec succès');
                this.reloadPageAfterDelay();
              },
              (error) => {
                console.error('Error creating question', error);
              }
            );
          });
          if (this.newQuizQuestionList.length == 0) {
            this.displayMessage('Le quiz a été créé avec succès');
          }
        },
        (error) => {
          console.error('Error creating quiz:', error);
          this.displayMessage("Problème lors de la création du quiz, ce dernier n'est sûrement pas jouable");
        }
      );
      
      this.closeModal();
      form.resetForm();
    }
  }

  updateQuestionQuizId(questionId: number, newQuizId: number): void {
    this.questionService.updateQuestionQuizId(questionId, newQuizId).subscribe(
      (updatedQuestion) => {

      },
      (error) => {
        console.error('Error updating question quizId:', error);

      }
    );
  }

  reloadPage(): void {
    location.reload();
  }

  displayMessage(message: string): void {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.backgroundColor = '#f0f0f0';
    messageElement.style.padding = '20px';
    messageElement.style.border = '1px solid #ccc';
    messageElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    messageElement.style.zIndex = '1000';

    document.body.appendChild(messageElement);

    setTimeout(() => {
      messageElement.remove();
    }, 1500);
  }

  reloadPageAfterDelay(): void {
    setTimeout(() => {
      this.reloadPage();
    }, 1500);
  }
}