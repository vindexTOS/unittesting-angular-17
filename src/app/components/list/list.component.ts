import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  TriggerToDoGet,
  deleteToDos,
  getList,
  putToDos,
  toDoItem,
} from '../../store/ToDoSlice';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `<div class="">
    @if(list.length > 0){ @for (item of list; track $index) {
    <div class="flex flex-col  todo-item-selector    ">
      @if(edit[$index]){
      <div class="flex items-center justify-center gap-2 py-2 ">
        <input
          [(ngModel)]="editedText"
          class="bg-green-200"
          value="{{ item.title }}"
          placeholder="{{ item.title }}"
        />
        <button
          (click)="handleEdit($index)"
          class="px-5 py-1 bg-blue-600 text-white rounded-[5px] "
        >
          CANCEL
        </button>
        <button
          (click)="handleSaveEdit(item, $index)"
          class="px-5 py-1 bg-green-600 text-white rounded-[5px] "
        >
          SAVE
        </button>
      </div>
      }@else {
      <div class="flex items-center justify-center gap-2 py-2">
        <p class="cursor-pointer" (click)="handleCheck(item)">
          {{ item.isActive ? '❌' : '✔️' }}
        </p>

        <p [ngClass]="item.isActive ? 'line-through' : ''">{{ item.title }}</p>

        <button
          (click)="handledelete(item.id?.toString() || '0')"
          class="px-5 py-1 bg-red-600 text-white rounded-[5px] "
        >
          DELETE
        </button>
        <button
          (click)="handleEdit($index)"
          class="px-5 py-1 bg-blue-600 text-white rounded-[5px] "
        >
          EDIT
        </button>
      </div>
      }
    </div>
    }}
  </div>`,
})
export class ListComponent {
  listSelector$!: Observable<any>;
  list: toDoItem[] = [];
  edit: boolean[] = [false];
  editedText: string = '';
  items: any;
  constructor(private store: Store) {
    this.listSelector$ = this.store.pipe(select(getList));
  }
  handledelete(id: string) {
    this.store.dispatch(deleteToDos({ id }));
  }
  handleEdit(index: number) {
    let newList = [...this.edit];
    newList[index] = !newList[index];
    this.edit = newList;
  }
  handleSaveEdit(toDoItem: toDoItem, index: number) {
    let obj = {
      title: this.editedText ? this.editedText : toDoItem.title,
      isActive: toDoItem.isActive,
      id: toDoItem.id,
    };
    this.store.dispatch(putToDos({ toDoItem: obj }));
    this.handleEdit(index);
  }

  handleCheck(toDoItem: toDoItem) {
    let obj = {
      title: toDoItem.title,
      isActive: !toDoItem.isActive,
      id: toDoItem.id,
    };
    this.store.dispatch(putToDos({ toDoItem: obj }));
    this.store.dispatch(TriggerToDoGet());
  }
  ngOnInit(): void {
    this.store.dispatch(TriggerToDoGet());
    this.store.select(getList).subscribe((list) => {
      this.list = list;
      this.edit = new Array(list.length).fill(false);
    });
  }
}
