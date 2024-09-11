import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {

  title: string = "";

  questions: any;
  questionSelected: any;

  answars: string[] = [];
  results: string = "";
  answarSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;
  mostFrequentItem: string = "";
  resultMessage: string = "";

  constructor() {
  }
  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
  
      this.questionIndex = 0;
      this.questionMaxIndex = quizz_questions.questions.length;
    }  
  }

  answarChoose(alias:string): void{
    this.answars.push(alias);
    this.nextStep();
  }

  nextStep(): void {
    this.questionIndex +=1;

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex];
    }else{
      this.finished = true;
      this.mostFrequentItem = this.checkResult(this.answars);
      this.resultMessage = quizz_questions.results[this.mostFrequentItem as keyof typeof quizz_questions.results] || 'Resultado não encontrado';
    }
  }

  checkResult(answers: string[]): string {
    const freqMap = answers.reduce((map, item) => {
      map.set(item, (map.get(item) || 0) + 1);
      return map;
    }, new Map<string, number>());

    let mostFrequentItem: string = "";
    let maxCount = 0;

    freqMap.forEach((count, item) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentItem = item;
      }
    });

    return mostFrequentItem ?? "";
  }
}
