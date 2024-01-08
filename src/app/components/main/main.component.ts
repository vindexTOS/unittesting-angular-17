import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-main',
  standalone: true,
  template: `
    <main class="flex items-center justify-center py-10  flex-col">
      <app-add></app-add>
      <app-list></app-list>
    </main>
  `,
  imports: [ListComponent, AddComponent],
})
export class MainComponent {}
