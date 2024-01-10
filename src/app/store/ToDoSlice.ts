import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

// initial state
export type toDoItem = {
  id?: number;
  title: string;
  isActive?: boolean;
};

interface initiaStateType {
  list: toDoItem[];
}
export const initialState: initiaStateType = {
  list: [],
};

// ACTIONS

export const TriggerToDoGet = createAction(
  '[get lsit trigger]get list trigger'
);

export const getToDos = createAction(
  '[get list]get list',
  props<{ toDoList: toDoItem[] }>()
);

export const postToDos = createAction(
  '[post list]post list',
  props<{ toDoItem: toDoItem }>()
);

export const putToDos = createAction(
  '[put list]put list',
  props<{ toDoItem: toDoItem }>()
);

export const deleteToDos = createAction(
  '[delete list]delete list',
  props<{ id: string }>()
);

export const getSingleToDos = createAction(
  '[get single]get single',
  props<{ id: number }>()
);

// REDUCCERS

const _ToDoReducer = createReducer(
  initialState,
  on(getToDos, (state, action) => {
    return { ...state, list: action.toDoList };
  })
);

export function ToDoReducer(state: any, action: any) {
  return _ToDoReducer(state, action);
}

// SELECTOR

export const listSelector = createFeatureSelector<any>('listSelector');

export const getList = createSelector(listSelector, (state) => {
  return state.list;
});
