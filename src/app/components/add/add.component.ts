import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { postToDos } from '../../store/ToDoSlice';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],

  template: `<div>
    <input [(ngModel)]="task" placeholder="task" />
    <button
      (click)="addTask()"
      class="px-5 py-1 bg-blue-400 text-white font-bold rounded-[2px]"
    >
      ADD
    </button>
  </div>`,
})
export class AddComponent {
  task: string = '';

  constructor(private store: Store) {}
  addTask() {
    if (this.task) {
      this.store.dispatch(
        postToDos({ toDoItem: { title: this.task, isActive: true } })
      );
      this.task = '';
    }
  }
}
