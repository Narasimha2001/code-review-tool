import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { ReviewOutputComponent } from './components/review-output/review-output.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CodeEditorComponent, ReviewOutputComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'codereview_FrontEnd';
  reviewToDisplay = '';

  onReviewGenerate(event: any) {
    this.reviewToDisplay = event.review;
  }
}
