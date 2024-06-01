import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Question, Answer } from '../../../models/question.model';
import { QuestionService } from '../../../services/question.service';
import { QuestionType } from '../../../models/question.model';
import { SoundQuestionComponent } from '../sound-question/sound-question.component';
import { SonService } from 'src/services/sound.service';
import { IndiceService } from 'src/services/indice.service';


import { ScoreService } from 'src/services/score-service.service';
import { NavbarService } from 'src/services/navbar.service';
import { QuizService } from 'src/services/quiz.service';
import { StatistiqueService } from 'src/services/statistique.service';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @ViewChild(SoundQuestionComponent) soundQuestionComponent: SoundQuestionComponent | undefined;

  @Input() questionList: Question[] = [];

  questionCleared: number[] = [];

  selectedAnswer: Answer[] = [];
  selectedAnswerCorrect: Answer[] = [];
  selectedAnswerWrong: Answer[] = [];
  public hint: boolean | undefined;
  hintText: string | undefined;
  hintImageUrl: string | undefined;
  public hintAudio: HTMLAudioElement | null = new Audio('assets/img/good.mp3');

  currentQuestionIndex: number = 0;
  QuestionType = QuestionType;

  showSuccessMessage: boolean = false;
  showFailureMessage: boolean = false;

  correctAnswersCount: number = 0;
  correctAnswersSecondAttempt: number = 0; 


  private messageTimeout: any;
  isNavVisible = false;


  private successAudio = new Audio('assets/img/good.mp3');
  answerSelected: any;

  answersSelected: Map<number, Answer[]> = new Map<number, Answer[]>();


  constructor(private statistiqueService: StatistiqueService, private quizService: QuizService, private router: Router, public questionService: QuestionService, public soundService: SonService, private indiceService: IndiceService, private navbarService: NavbarService, private scoreService: ScoreService) {
    
    this.questionList = this.quizService.getFilteredQuestions();
    if (this.indiceService.estIndiceActif() && this.questionList[this.currentQuestionIndex] != undefined) {
      this.indiceService.setIndice(this.questionList[this.currentQuestionIndex].hint);
    } else {
      this.indiceService.setIndice(undefined);
    }
    this.hint = this.indiceService.hint;
    this.hintText = this.indiceService.hintText
    this.hintImageUrl = this.indiceService.hintImageUrl
    this.hintAudio = new Audio('assets/img/good.mp3');

    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });
  }
  /*ngOnInit(): void {
    console.log(this.questionList);
  }*/

  ngOnInit(): void {
    const quizId = 1; // Set the quizId according to your application logic
    this.questionService.fetchQuestions(quizId).subscribe(questions => {
      this.questionList = questions;
      this.questionService.saveQuestionsToLocalStorage(questions);
    });
  }

  nextQuestion() : void{
    this.resetMessages();
    if (this.currentQuestionIndex < this.questionList.length - 1) {
      this.currentQuestionIndex++;
    }
    if (this.soundQuestionComponent) {
      this.soundQuestionComponent.stopSound();
    }

    const currentQuestion = this.questionList[this.currentQuestionIndex];
    console.log(currentQuestion.answers[0]);
    console.log(this.selectedAnswerCorrect.length);

    currentQuestion.answers.forEach((item, index2) => {
      this.selectedAnswerCorrect.forEach((item2) => {
        if (item == item2) {
          console.log("item", item);
          console.log("index2", index2);
          const answer = document.getElementById("answer" + index2);
          
          answer?.classList.add("right-answer");
          answer?.classList.remove("selected");
          console.log("answer", answer);
        }
      });
    });
  }

  previousQuestion(): void{
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
    if (this.soundQuestionComponent) {
      this.soundQuestionComponent.stopSound();
    }
    this.resetMessages();

    const currentQuestion = this.questionList[this.currentQuestionIndex];

    

  }

  validateQuestion(): void {
    if (this.selectedAnswer.length === 0) {
      alert('Veuillez sélectionner au moins une réponse avant de valider.');
      return;
    }
    this.selectedAnswer.forEach((item, index) => {
      item.alreadySelected = true;
    });
    const currentQuestion = this.questionList[this.currentQuestionIndex];
    const correctAnswers = currentQuestion.answers.filter(a => a.isCorrect);

    const currentQuestionId = this.questionList[this.currentQuestionIndex].id;

    // Ajouter l'ID de la question et les réponses sélectionnées à answersSelected
    this.answersSelected.set(currentQuestionId, this.selectedAnswer);

    this.resetMessages();
  

    this.selectedAnswer.forEach((item) => {
      currentQuestion.answers.forEach((item2, index2) => {
        if (item == item2) {
          const answer = document.getElementById("answer" + index2);
          answer?.classList.remove("selected");

          if (!item.isCorrect) {
            this.selectedAnswerWrong.push(item2);
            answer?.classList.add("wrong-answer");
          }
          else {
            this.selectedAnswerCorrect.push(item2);
            answer?.classList.add("right-answer");
            console.log("answer", answer);
          }
        }
      });

    });


    this.selectedAnswerCorrect = this.selectedAnswerCorrect.filter((item, index) => this.selectedAnswerCorrect.indexOf(item) == index);
    this.selectedAnswerWrong = this.selectedAnswerWrong.filter((item, index) => this.selectedAnswerWrong.indexOf(item) == index);


    if (correctAnswers.every((item) => this.selectedAnswerCorrect.includes(item))) {
      this.showSuccessMessage = true;
      this.soundService.playSound('assets/img/good.mp3');
      this.questionCleared.push(this.currentQuestionIndex);
      if (this.correctAnswersSecondAttempt == 0) {
        this.correctAnswersCount++;
      }
    } else {
      this.showFailureMessage = true;
      if (this.indiceService.estIndiceActif()) {
        this.indiceService.setIndice(this.questionList[this.currentQuestionIndex].hint);
        this.hintAudio = this.indiceService.hintAudio
        this.hintText = this.indiceService.hintText;
        this.hintImageUrl = this.indiceService.hintImageUrl

        if (this.hintImageUrl) {
          setTimeout(() => {
            this.hintImageUrl = undefined;
          }, 3000);
        }
        if (this.hintAudio) {
          this.hintAudio.play();
          setTimeout(() => {
            if (this.hintAudio) {
              this.hintAudio.pause();
              this.hintAudio.currentTime = 0;
            }
          }, 5000);
        }
      }
      this.correctAnswersSecondAttempt++;
    }

    this.messageTimeout = setTimeout(() => {
      this.showSuccessMessage = false;
      this.showFailureMessage = false;
      if (this.indiceService.estIndiceActif()) {
        this.indiceService.setIndice(this.questionList[this.currentQuestionIndex].hint);
        this.hintText = this.indiceService.hintText;
        this.hintImageUrl = this.indiceService.hintImageUrl
      }
      this.indiceService.hintImageUrl = undefined;
    }, 8000);
  }


  resetMessages() {

    clearTimeout(this.messageTimeout);
    this.showSuccessMessage = false;
    this.showFailureMessage = false;
    this.indiceService.hintText = undefined;
    this.indiceService.hintImageUrl = undefined;
    if (this.indiceService.hintAudio) {
      this.indiceService.hintAudio.pause();
      this.indiceService.hintAudio.currentTime = 0;
    }
  }

  onAnswerSelected(answer: Answer[]): void {
    this.selectedAnswer = answer.filter(a => a.isSelected);
    this.resetMessages();
  }

  generateArray(num: number): any[] {
    if (num > 12) num = 12;
    return Array(num);
  }
  finishQuiz() {
    this.scoreService.updateSelectedAnswersCount(this.selectedAnswerCorrect.length);
    const quizId = 1716767415981;
    this.statistiqueService.setCorrectFirstAttemptCount(quizId, this.selectedAnswerCorrect.length);
    this.router.navigate(['/end-game']);
  }
}
