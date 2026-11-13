import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSurveyModalComponent } from '../../components/create-survey-modal/create-survey-modal';


@Component({
  imports: [CommonModule, CreateSurveyModalComponent],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})

export class Header {
  isModalOpen = false;
}
