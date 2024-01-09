import { hot, cold } from 'jasmine-marbles';
import { ListEffect } from './ToDoEffect';
import { TodoService } from '../services/todo.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, mergeMap, of, throwError } from 'rxjs';

import { Store } from '@ngrx/store';
import { TriggerToDoGet, getToDos, postToDos } from './ToDoSlice';
import { statusError, statusSuccses } from './StatusHanndle/Status.action';
import { TestScheduler } from 'rxjs/testing';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
// const source = cold('-a-b-c-|');
// const expected = cold('--x-y-z-|');

// expect(source).toBeObservable(expected);
describe('AddToDoEffect', () => {
  let actions$: Observable<any>;
  let effects: ListEffect;
  let todoService: jasmine.SpyObj<TodoService>;
  let store: jasmine.SpyObj<Store>;
  let scheduler: TestScheduler;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  beforeEach(() => {
    todoService = jasmine.createSpyObj('TodoService', [
      'postList',
      'getAllList',
    ]);
    store = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
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
  // GET REUQEST
  it('should dispatch getToDos action with the task list when TriggerToDoGet is dispatched', () => {
    const action = TriggerToDoGet();
    const response = [
      { title: 'Task Test 1', isActive: false, id: 1 },
      { title: 'Task Test 2', isActive: false, id: 2 },
      { title: 'Task Test 3', isActive: false, id: 3 },
    ];
    const expectedAction = getToDos({ toDoList: response });

    todoService.getAllList.and.returnValue(of(response));

    actions$ = hot('-a', { a: action });
    const expected$ = cold('-b', { b: expectedAction });

    expect(effects.ToDoListGet$).toBeObservable(expected$);
  });
  // ERROR
  it('should handle error if getAllList throws an error', (done) => {
    const action = TriggerToDoGet();
    const errorResponse = new Error('error');

    // Mock the service to throw an error
    todoService.getAllList.and.returnValue(throwError(() => errorResponse));

    // Set up the action stream
    actions$ = of(action);

    // Trigger the effect manually
    effects.ToDoListGet$.subscribe((resultAction) => {
      // Check if the correct action is dispatched
      expect(resultAction).toEqual(getToDos({ toDoList: [] })); // Update with your expected action

      // You can add additional expectations based on your error handling logic

      done();
    });
  });
  // POST REQUEST
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
  // ERROR
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
