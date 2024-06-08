import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QUESTION_LIST } from 'src/mocks/question.mock';
import { Quiz } from 'src/models/quiz.model';
import { Theme } from 'src/models/theme.model';
import { Question, QuestionType } from 'src/models/question.model';
import { QuizService } from 'src/services/quiz.service';
import { ThemeService } from 'src/services/theme.service';
import { QuestionService } from 'src/services/question.service';
import {QuestionAddComponent} from 'src/app/questions/question-add/question-add.component'

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.scss']
})
export class QuizAddComponent implements OnInit {

  

  src: string | undefined;
  themeList: Theme[] = [];
  quizList: Quiz[] = [];
  showQuizzes = false;
  showQuestionsAdd=false ; 
  showHintAdd=false ; 
  QuizList: Quiz[] = [];
  questionList: Question[] = [];
  displayForm = false;
  newQuizQuestionList : Question[] = [];
  selectedQuiz: any = null;
  selectedQuestions: Set<string> = new Set();
  displayFormUpdate = false;
  displayFormDelete = false;
  showQuestionPopup: boolean = false;
  showAnswerAdd: boolean = false;
  answers: string[] = [''];
  correctAnswers: boolean[] = [false];


  

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

    
    

  }

  ngOnInit(): void {
  }

  addAnswer() {
    if (this.answers.length < 4) {
      this.answers.push('');
      this.correctAnswers.push(false);
    }
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

  question: Question = {
    id: 0,
    label: '',
    typeOfQuestion: QuestionType.MultipleChoice,
    niveau: '',
    answers: [{
      value: '', isCorrect: false,
      id: 0
    }],
    hint: { text: '', imageUrl: '', audioUrl: '' }
  };

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
    console.log("SALUT JE SUIS DANS LE METHODE ET JE NE SAIS PAS PRQ")
    const quizTitle = form.value.quizTitle;
    const quizTheme = form.value.quizTheme;
    const quizDescription = form.value.quizDescription;
    const quizQuestions = this.newQuizQuestionList;
    const quizImage = this.src;
    console.log(quizTitle, quizTheme, quizDescription, quizImage );



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
    console.log(this.questionList)
    this.showQuizzes = !this.showQuizzes;
    console.log(this.showQuizzes)
  }



  selectQuiz(quiz: any) {
    console.log(this.showQuizzes)
    this.selectedQuiz = quiz;
    this.showQuestionPopup = !this.showQuestionPopup;
    console.log("le probleme est apres le set des quiz")
    this.selectedQuestions.clear(); 
   
  }

  toggleQuestionPopup() {
    this.showQuestionPopup = !this.showQuestionPopup;
  }

  toggleAnswerAdd(){
    this.showAnswerAdd = !this.showAnswerAdd;
  }

  toggleAnswerAddForQuestion(){

  }


  onQuestionToggle(question: Question, event: any) {
    if (event.target.checked) {
      this.newQuizQuestionList.push(question);
    } else {
      this.newQuizQuestionList = this.newQuizQuestionList.filter(item => item !== question);
    }
    console.log(this.selectedQuestions)
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


  toggleQuestionsAdd(){
  this.showQuestionsAdd = ! this.showQuestionsAdd; 
  }

  toggleHintAdd(){
    this.showHintAdd = ! this.showHintAdd; 
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

  submitFormQuestion(form: NgForm): void {

    const answers: never[] = [];
    
  
    const label = form.value.label;
    const typeOfQuestion = form.value.typeOfQuestion;
    const niveau = form.value.niveau;
    const image = form.value.image;
    const audio = form.value.audio;
    const quizId = form.value.quizId;
  
    
  
    
    const newQuestion: Question = {
      label: label,
      typeOfQuestion: typeOfQuestion,
      niveau: niveau,
      image: image ,
      audio: audio ,
      answers: answers,
      id: 0
    };
  
    
    this.newQuizQuestionList.push(newQuestion);
    this.questionService.createQuestion(1716811675095 , newQuestion)
    console.log(this.newQuizQuestionList)
  
    
    form.resetForm();
  }

  submitFormQuiz(form: NgForm): void {
    

    const quizTitle = form.value.quizTitle;
    const quizTheme = form.value.quizTheme;
    const quizDescription = form.value.quizDescription;
    const quizImage =form.value.quizImage;
    const selectedQuestions = this.newQuizQuestionList; 
    console.log("QuestionSelected" + selectedQuestions)

    const newQuiz: Quiz = {
      name: quizTitle,
      description: quizDescription,
      theme: quizTheme,
      questions: selectedQuestions,
      statut: 'draft', 
      image: quizImage,
      id:0 
    };
    

   
    this.quizService.addQuiz(newQuiz)
        this.closeModal();
        form.resetForm();
     
  }


}