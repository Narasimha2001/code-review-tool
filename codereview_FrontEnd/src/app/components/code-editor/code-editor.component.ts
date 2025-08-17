import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-code-editor',
  imports: [FormsModule],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss',
  standalone: true,
})
export class CodeEditorComponent {
  inputCode: string = '';
  http = inject(HttpClient);
  @Output('onReview') onReview = new EventEmitter();

  async onSubmit() {
    const loader: any = document.getElementById('loader');
    try {
      const reqObj = {
        code: this.inputCode,
      };
      loader.classList.remove('hidden');
      const res = await firstValueFrom(this.http.post('review', reqObj));
      this.onReview.emit(res);
      loader.classList.add('hidden');
    } catch (error) {
      loader.classList.add('hidden');
      alert('Unable to process your request, Please try again');
    }
  }
}
