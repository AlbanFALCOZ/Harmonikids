import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Question, Answer } from '../../../models/question.model';
import { QuestionService } from '../../../services/question.service';
import { QuestionType } from '../../../models/question.model';
import { SoundQuestionComponent } from '../sound-question/sound-question.component';
import { ScoreService } from 'src/services/score-service-component.service';
import { NavbarService } from 'src/services/navbar.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @ViewChild(SoundQuestionComponent) soundQuestionComponent: SoundQuestionComponent | undefined;

  public questionList: Question[] = [];
  questionCleared: number[] = [];

  selectedAnswerAllQuestions: Answer[] = [];
  selectedAnswer: Answer[] = [];
  selectedAnswerCorrect: Answer[] = [];
  selectedAnswerWrong: Answer[] = [];

  currentQuestionIndex: number = 0;
  QuestionType = QuestionType;

  showSuccessMessage: boolean = false;
  showFailureMessage: boolean = false;

  hintText: string | undefined;
  hintImageUrl: string | undefined;
  private hintAudio: HTMLAudioElement | null = null;

  private messageTimeout: any;

  isNavVisible = false;


  private successAudio = new Audio('assets/img/good.mp3');
  answerSelected: any;

  constructor(private router: Router, public questionService: QuestionService, private navbarService: NavbarService) {
    this.questionList = this.questionService.getQuestionsFromLocalStorage();
    if (this.questionList.length === 0) {
      this.questionService.questions$.subscribe((questions: Question[]) => {
        this.questionList = questions;
        this.questionService.saveQuestionsToLocalStorage(questions);
      });
    }
    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });

  }

  ngOnInit(): void {
    console.log(this.questionList);
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionList.length - 1) {
      this.currentQuestionIndex++;
    }
    if (this.soundQuestionComponent) {
      this.soundQuestionComponent.stopSound();
    }
    this.resetMessages();
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
    if (this.soundQuestionComponent) {
      this.soundQuestionComponent.stopSound();
    }
    this.resetMessages();

  }


  validateQuestion(): void {
    if (this.selectedAnswer.length === 0) {
      alert('Veuillez sélectionner au moins une réponse avant de valider.');
      return;
    }
    this.selectedAnswer.forEach((item, index) => {
      item.alreadySelected = true;
      this.selectedAnswerAllQuestions.push(item);
    });
    this.selectedAnswerAllQuestions.filter((item, index) => this.selectedAnswerAllQuestions.indexOf(item) == index);
    const currentQuestion = this.questionList[this.currentQuestionIndex];
    const correctAnswers = currentQuestion.answers.filter(a => a.isCorrect);

    this.resetMessages();

    const selectedAreAllCorrect = this.selectedAnswer.every(sa => sa.isCorrect);
    const allCorrectAnswersSelected = correctAnswers.length === this.selectedAnswer.length &&
      correctAnswers.every(ca => this.selectedAnswer.some(sa => sa.value === ca.value));

    this.selectedAnswer.forEach((item, index) => {
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
          }
        }
      });

    });

    this.selectedAnswerCorrect = this.selectedAnswerCorrect.filter((item, index) => this.selectedAnswerCorrect.indexOf(item) == index);


    if (correctAnswers.every((item) => this.selectedAnswerCorrect.includes(item))) {
      this.showSuccessMessage = true;
      this.successAudio.play();
      this.questionCleared.push(this.currentQuestionIndex);

    } else {
      this.showFailureMessage = true;
      const hint = this.questionList[this.currentQuestionIndex].hint;
      this.showHint(hint);
    }

    this.messageTimeout = setTimeout(() => {
      this.showSuccessMessage = false;
      this.showFailureMessage = false;
      this.hintText = undefined;
      this.hintImageUrl = undefined;
    }, 8000);
  }


  showHint(hint: any) {
    if (this.hintAudio) {
      this.hintAudio.pause();
    }

    if (hint) {
      if (hint.audioUrl) {
        this.hintAudio = new Audio(hint.audioUrl);
        this.hintAudio.play();
      }
      this.hintText = hint.text;
      this.hintImageUrl = hint.imageUrl;
    }
  }


  resetMessages() {
    clearTimeout(this.messageTimeout);
    this.showSuccessMessage = false;
    this.showFailureMessage = false;
    this.hintText = undefined;
    this.hintImageUrl = undefined;
    if (this.hintAudio) {
      this.hintAudio.pause();
      this.hintAudio.currentTime = 0;
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
}
