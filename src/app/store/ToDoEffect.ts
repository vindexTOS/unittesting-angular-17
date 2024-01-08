import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { mergeMap, of, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import {
  deleteToDos,
  getToDos,
  postToDos,
  putToDos,
  TriggerToDoGet,
} from './ToDoSlice';
import { statusSuccses, statusError } from './StatusHanndle/Status.action';

@Injectable()
export class ListEffect {
  constructor(
    private actions$: Actions,
    private store: Store,
    private toDoService: TodoService,
    private router: Router
  ) {}

  ToDoListGet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TriggerToDoGet),
      mergeMap(() => {
        return this.toDoService.getAllList().pipe(
          map((res: any) => {
            console.log(res);

            return getToDos({ toDoList: res });
          }),
          catchError((error) => {
            throw new Error(error);
          })
        );
      })
    )
  );

  ToDoListPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postToDos),
      mergeMap((action: any) => {
        console.log(action.toDoItem);
        return this.toDoService.postList(action.toDoItem).pipe(
          map((res: any) => {
            this.store.dispatch(TriggerToDoGet());
            return statusSuccses({ succses: 'posted' });
          }),
          catchError((error) => {
            console.log(error);
            return of(statusError({ error: 'API ERROR' })); // Use 'of' to return an observable
          })
        );
      })
    )
  );

  ToDoRemove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteToDos),
      mergeMap((action: any) => {
        return this.toDoService.deleteList(action.id).pipe(
          map((res: any) => {
            this.store.dispatch(TriggerToDoGet());
            return statusSuccses({ succses: 'deleted' });
          }),
          catchError((error) => {
            console.log(error);
            throw new Error(error);
          })
        );
      })
    )
  );

  ToDoPut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(putToDos),
      mergeMap((action: any) => {
        console.log(action);
        return this.toDoService.putList(action.toDoItem).pipe(
          map((res: any) => {
            this.store.dispatch(TriggerToDoGet());
            return statusSuccses({ succses: 'updated' });
          }),
          catchError((error) => {
            console.log(error);
            throw new Error(error);
          })
        );
      })
    )
  );
}
