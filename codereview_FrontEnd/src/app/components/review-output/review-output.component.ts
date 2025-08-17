import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-review-output',
  imports: [],
  templateUrl: './review-output.component.html',
  styleUrl: './review-output.component.scss',
})
export class ReviewOutputComponent implements OnChanges {
  @Input('reviewToDisplay') reviewToDisplay = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      const tag = document.querySelector('#review');
      if (tag && this.reviewToDisplay != '') {
        tag.innerHTML = this.reviewToDisplay;
        tag.scrollIntoView();
      }
    }
  }
}
