import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',

  imports: [CommonModule, RouterOutlet, MainComponent],
})
export class AppComponent {
  title = 'project';
}
