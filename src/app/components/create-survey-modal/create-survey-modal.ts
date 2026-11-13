import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-survey-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Behebt die formGroup und ngFor Fehler
  templateUrl: './create-survey-modal.html',
  styleUrls: ['./create-survey-modal.scss']
})
export class CreateSurveyModalComponent {
  @Output() close = new EventEmitter<void>(); // Um das Modal von außen zu schließen
  surveyForm: FormGroup;

  String = String;

  categories = ['Team activities', 'Gaming & Entertainment', 'Health & Wellness'];

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      // Pflichtfeld
      surveyName: ['', Validators.required],
      // Optional
      endDate: [''],
      // Pflichtfeld
      category: ['', Validators.required],
      // Optional
      description: [''],
      // FormArray für dynamische Fragen
      questions: this.fb.array([this.createQuestion()])
    });
  }

  // Erstellt eine neue Frage-Gruppe
  createQuestion(): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required], // Pflichtfeld
      allowMultiple: [false],
      // Standardmäßig 2 Antworten pro Frage
      answers: this.fb.array([this.createAnswer(), this.createAnswer()])
    });
  }

  // Erstellt eine neue Antwort-Gruppe
  createAnswer(): FormGroup {
    return this.fb.group({
      answerText: ['', Validators.required] // Pflichtfeld
    });
  }

  // --- Getter für einfacheres Zugreifen im HTML ---
  get questions() {
    return this.surveyForm.get('questions') as FormArray;
  }

  getAnswers(questionIndex: number) {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  // --- Aktionen ---
  addQuestion() {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    }
  }

  addAnswer(questionIndex: number) {
    this.getAnswers(questionIndex).push(this.createAnswer());
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    const answers = this.getAnswers(questionIndex);
    if (answers.length > 1) {
      answers.removeAt(answerIndex);
    }
  }

  closeModal() {
    this.close.emit();
  }

  publish() {
    if (this.surveyForm.valid) {
      console.log('Formular Daten bereit für Supabase:', this.surveyForm.value);
      // Hier rufen wir später deinen SupabaseService auf!
    } else {
      // Markiert alle Felder als "berührt", um Fehler anzuzeigen
      this.surveyForm.markAllAsTouched();
    }
  }
}