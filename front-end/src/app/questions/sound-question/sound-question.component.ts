import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question, Answer } from 'src/models/question.model';
import { ScoreService } from 'src/services/score-service-component';

@Component({
  selector: 'app-sound-question',
  templateUrl: './sound-question.component.html',
  styleUrl: './sound-question.component.scss'
})
export class SoundQuestionComponent {

  constructor(private scoreService: ScoreService) { }

  @Input() sound?: Question;

  showMessage: boolean = false;
  message: string = '';
  audio = new Audio();
  audioFirstTime: boolean = true;
  anwsersChosen: Answer[] = new Array();

  @Input()
  answerAlreadySeleted?: Answer[];

  selectedAnswer: Answer[] = [];

  @Output() answerSelected = new EventEmitter<Answer[]>();


  ngOnInit(): void {
  }

  onSelectAnswer(answer: Answer): void {
    if (this.sound && this.sound.answers) {
      if (answer.alreadySelected) {
        return;
      }
      const correctAnswersCount = this.sound.answers.filter(ans => ans.isCorrect).length;

      if (correctAnswersCount === 1) {
        this.sound.answers.forEach(ans => {
          if (ans.value !== answer.value) {
            ans.isSelected = false;
          }
        });
        answer.isSelected = true;
      } else {
        answer.isSelected = !answer.isSelected;
      }
      this.answerSelected.emit(this.sound.answers.filter((a) => a.isSelected));
    }
  }

  playSound() {
    if (this.sound && this.sound.audio) {
      const button = document.getElementById("sound-player");
      button?.classList.toggle("paused");
      if (this.audioFirstTime) {
        this.audioFirstTime = !this.audioFirstTime;
        this.audio.src = this.sound?.audio;
        this.audio.load();
        this.audio.play();
      }
      else {
        if (this.audio.paused) {
          this.audio.play();
        }
        else {
          this.audio.pause();
        }
      }

    }

    setTimeout(() => {
      this.showMessage = false;
    }, 8000);
  }

}
