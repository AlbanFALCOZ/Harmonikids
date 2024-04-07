import { Component, Input } from '@angular/core';
import { Question, Answer } from 'src/models/question.model';

@Component({
  selector: 'app-sound-question',
  templateUrl: './sound-question.component.html',
  styleUrl: './sound-question.component.scss'
})
export class SoundQuestionComponent {

  @Input() sound?: Question;

  showMessage: boolean = false;
  message: string = '';
  audio = new Audio();
  audioFirstTime: boolean = true;
  anwsersChosen: Answer[] = new Array();


  checkAnswer(selectedAnswer: Answer) {
    if (selectedAnswer.isCorrect) {
      if (!this.anwsersChosen.includes(selectedAnswer)) {
        this.showMessage = true;
        this.message = 'Bravo, mais tu es super fort et tu viens de gagner 15 étoiles!!!';
        this.anwsersChosen.push(selectedAnswer);
        this.sound?.answers.forEach((item, index) => {
          if (item === selectedAnswer) {
            if (this.sound && this.sound.answers) {
              const answer = document.getElementById("answer" + index);
              answer?.classList.add("right-answer");
            }
          }
        });
      }

    } else {
      this.sound?.answers.forEach((item, index) => {
        if (item === selectedAnswer) {
          if (this.sound && this.sound.answers) {
            if (this.sound.answers.length > 2) {
              const answer = document.getElementById("answer" + index);
              answer?.classList.add("wrong-anwser");
            }
            else if (this.sound.answers.length == 2) {
              this.message = 'Tu es sûr? Tu peux toujours changer de avis.';
              this.showMessage = true;
            }
          }

        }
      });

    }

    setTimeout(() => {
      this.showMessage = false;
    }, 4000);
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
