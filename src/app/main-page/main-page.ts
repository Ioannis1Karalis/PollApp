import { Component } from '@angular/core';
import { Header } from '../layout/header/header';
import { SurveysSection } from '../surveys-section/surveys-section';

@Component({
  imports: [Header, SurveysSection],
  selector: 'app-main-page',
  styleUrl: './main-page.scss',
  templateUrl: './main-page.html',
})
export class MainPage {}
