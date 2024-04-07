import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question, Answer } from '../../../models/question.model';
import { QuestionService } from '../../../services/question.service';
import { QuestionType } from '../../../models/question.model';
import { TitleService } from '../../../services/title.service';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  public questionList: Question[] = [];
  selectedAnswer: Answer[] = [];
  currentQuestionIndex: number = 0;
  QuestionType = QuestionType;
  
  showSuccessMessage: boolean = false;
  showFailureMessage: boolean = false;

  hintText: string | undefined;
  hintImageUrl: string | undefined;
  private hintAudio: HTMLAudioElement | null = null;



  constructor(private router: Router, public questionService: QuestionService) {
    this.questionService.questions$.subscribe((questions: Question[]) => {
      this.questionList = questions;
    });

  }

  ngOnInit(): void {
    console.log(this.questionList)
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionList.length - 1) {
      this.currentQuestionIndex++;
    }
    this.resetMessages();
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
    this.resetMessages();

  }
  
  
  validateQuestion(): void {
    if (this.selectedAnswer.length === 0) {
      alert('Veuillez sélectionner au moins une réponse avant de valider.');
      return;
    }
  
    const currentQuestion = this.questionList[this.currentQuestionIndex];
    const correctAnswers = currentQuestion.answers.filter(a => a.isCorrect);
  
    this.resetMessages();

    const selectedAreAllCorrect = this.selectedAnswer.every(sa => sa.isCorrect);
    const allCorrectAnswersSelected = correctAnswers.length === this.selectedAnswer.length &&
                                      correctAnswers.every(ca => this.selectedAnswer.some(sa => sa.value === ca.value));
  
    if (selectedAreAllCorrect && allCorrectAnswersSelected) {
      this.showSuccessMessage = true;
    } else {
      this.showFailureMessage = true;
      const hint = this.questionList[this.currentQuestionIndex].hint;
      this.showHint(hint);
    }
  
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.showFailureMessage = false;
    }, 7000); 
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
}
