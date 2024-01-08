import { hot, cold } from 'jasmine-marbles';
import { ListEffect } from './ToDoEffect';
import { TodoService } from '../services/todo.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { Store } from '@ngrx/store';
import { TriggerToDoGet, postToDos } from './ToDoSlice';
import { statusError, statusSuccses } from './StatusHanndle/Status.action';

describe('AddToDoEffect', () => {
  let actions$: Observable<any>;
  let effects: ListEffect;
  let todoService: jasmine.SpyObj<TodoService>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {
    todoService = jasmine.createSpyObj('TodoService', ['postList']);
    store = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      providers: [
        ListEffect,
        provideMockActions(() => actions$),
        { provide: TodoService, useValue: todoService },
        { provide: Store, useValue: store },
      ],
    });

    // Inject the service and store after configuring the testing module
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;

    // Inject the effect after configuring the testing module
    effects = TestBed.inject(ListEffect);
  });

  it('should dispatch TriggerToDoGet and statusSuccsess actions when postToDos is called successfully', () => {
    // Arrange
    const action = postToDos({
      toDoItem: { title: 'Test Task', isActive: true },
    });

    // Set up the service spy to return an observable indicating a successful API call
    todoService.postList.and.returnValue(of({}));

    // Act
    actions$ = hot('-a', { a: action });

    // Assert
    effects.ToDoListPost$.subscribe(() => {
      expect(todoService.postList).toHaveBeenCalledWith(action.toDoItem);
      expect(store.dispatch).toHaveBeenCalledWith(TriggerToDoGet());
      expect(store.dispatch).not.toHaveBeenCalledWith(
        statusSuccses({ succses: 'posted' })
      );
    });
  });

  it('should dispatch an error action when postToDos fails', () => {
    // Arrange
    const action = postToDos({
      toDoItem: { title: 'Test Task', isActive: true },
    });
    const error = new Error('API Error');

    // Set up the service spy to return an observable indicating a failed API call
    todoService.postList.and.returnValue(throwError(() => error));

    // Act
    actions$ = hot('-a', { a: action });

    // Assert
    effects.ToDoListPost$.subscribe(() => {
      expect(todoService.postList).toHaveBeenCalledWith(action.toDoItem);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        statusError({ error: 'API ERROR' })
      );
    });
  });
});
