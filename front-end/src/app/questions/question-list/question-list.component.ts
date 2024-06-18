import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { GameService } from 'src/services/game.service';
import { MembreService } from 'src/services/membre.service';
import { log } from 'console';
import { CountdownEvent } from 'ngx-countdown';


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
  hint: boolean | undefined;
  hintText: string | undefined;
  hintImageUrl: string | undefined;
  hintAudio: HTMLAudioElement | null = new Audio('assets/img/good.mp3');
  currentQuestionIndex: number = 0;
  QuestionType = QuestionType;
  showSuccessMessage: boolean = false;
  showFailureMessage: boolean = false;
  correctAnswersCount: number = 0;
  correctAnswersSecondAttempt: number = 0;
  niveau: string;


  private messageTimeout: any;
  isNavVisible = false;
  private successAudio = new Audio('assets/img/good.mp3');
  answerSelected: any;
  childId: number | undefined = 0;

  constructor(
    private gameService: GameService,
    private statistiqueService: StatistiqueService,
    private quizService: QuizService,
    private router: Router,
    public questionService: QuestionService,
    public soundService: SonService,
    private indiceService: IndiceService,
    private navbarService: NavbarService,
    private scoreService: ScoreService,
    private membreService: MembreService
  ) {
    this.questionList = this.quizService.getFilteredQuestions();
    this.niveau = this.quizService.getLevel();
    if (this.indiceService.estIndiceActif() && this.questionList[this.currentQuestionIndex] != undefined) {
      this.indiceService.setIndice(this.questionList[this.currentQuestionIndex].hint);
    } else {
      this.indiceService.setIndice(undefined);
    }
    this.hint = this.indiceService.hint;
    this.hintText = this.indiceService.hintText;
    this.hintImageUrl = this.indiceService.hintImageUrl;
    this.hintAudio = new Audio('assets/img/good.mp3');

    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });
  }

  ngOnInit(): void {
    const quizId = this.questionService.getCurrentQuizId();
    const childId = this.membreService.getMemberId();

    if (childId && quizId) {
      this.gameService.getGame(childId, quizId);
    }
    console.log('Quiz ID:', quizId);
    console.log('Child ID:', childId);

  }

  nextQuestion(): void {
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
        if (item === item2) {
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

  previousQuestion(): void {
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
    this.selectedAnswer.forEach((item) => {
      item.alreadySelected = true;
    });
    const currentQuestion = this.questionList[this.currentQuestionIndex];
    const correctAnswers = currentQuestion.answers.filter(a => a.isCorrect);

    const quizId = this.questionService.getCurrentQuizId();
    const childId = this.membreService.getMemberId();
    const questionId = this.questionList[this.currentQuestionIndex].id;

    if (childId) {
      this.gameService.saveChosenAnswers(childId, quizId, questionId, this.selectedAnswer, this.selectedAnswerCorrect.length);
    }
    console.log("selectedAnswer", this.selectedAnswer);

    this.resetMessages();

    this.selectedAnswer.forEach((item) => {
      currentQuestion.answers.forEach((item2, index2) => {
        if (item === item2) {
          const answer = document.getElementById("answer" + index2);
          answer?.classList.remove("selected");

          if (!item.isCorrect) {
            this.selectedAnswerWrong.push(item2);
            answer?.classList.add("wrong-answer");
          } else {
            this.selectedAnswerCorrect.push(item2);
            answer?.classList.add("right-answer");
            console.log("answer", answer);
          }
        }
      });
    });

    this.selectedAnswerCorrect = this.selectedAnswerCorrect.filter((item, index) => this.selectedAnswerCorrect.indexOf(item) === index);
    this.selectedAnswerWrong = this.selectedAnswerWrong.filter((item, index) => this.selectedAnswerWrong.indexOf(item) === index);

    if (correctAnswers.every((item) => this.selectedAnswerCorrect.includes(item))) {
      this.showSuccessMessage = true;
      this.soundService.playSound('assets/img/good.mp3');
      this.questionCleared.push(this.currentQuestionIndex);
      if (this.correctAnswersSecondAttempt === 0) {
        this.correctAnswersCount++;
        this.gameService.incrementCorrectFirstAttemptCount(childId!, quizId);
      }
    } else {
      this.showFailureMessage = true;
      if (this.indiceService.estIndiceActif()) {
        this.indiceService.setIndice(this.questionList[this.currentQuestionIndex].hint);
        this.hintAudio = this.indiceService.hintAudio;
        this.hintText = this.indiceService.hintText;
        this.hintImageUrl = this.indiceService.hintImageUrl;

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
        this.hintImageUrl = this.indiceService.hintImageUrl;
      }
      this.indiceService.hintImageUrl = undefined;
    }, 8000);
  }

  resetMessages(): void {
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

  finishQuiz(): void {
    this.scoreService.updateSelectedAnswersCount(this.selectedAnswerCorrect.length);
    const quizId = this.questionService.getCurrentQuizId();
    const childId = this.membreService.getMemberId();
    const game = this.gameService.getGame(childId, quizId);
    console.log('Game:', game);
    this.quizService.updateQuizStatus(quizId, 'Terminé');
    this.gameService.sendGameDataToBackend(game!).subscribe(() => {
      this.gameService.setQuizCompleted(childId, quizId);
      this.router.navigate(['/end-game']);
    });
    
  }

  async onTimerFinished(e: CountdownEvent) {
    if (e.action == 'done') {
      alert("Il n'y a plus de temps, c'est la fin du quiz !");
      this.validateQuestion();
      await this.delay(2000);
      this.finishQuiz();
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
