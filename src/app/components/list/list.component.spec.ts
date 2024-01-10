import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { ListComponent } from './list.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  TriggerToDoGet,
  deleteToDos,
  getList,
  putToDos,
  toDoItem,
} from '../../store/ToDoSlice';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'pipe', 'select']);

    mockStore.select.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [ListComponent, FormsModule, NgClass],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should delete task from from the list', () => {
    const itemId = '32';

    component.handledelete(itemId);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      deleteToDos({ id: itemId })
    );
  });
  it('should update edit list boolean value based on index', () => {
    const testValues = [false, false, false];
    const index = 1;
    component.edit = [...testValues];

    component.handleEdit(index);

    expect(component.edit[index]).toBe(true);
    expect(component.edit).toEqual([false, true, false]);
  });
  it('should handle save edit by getting task data as a prop, updating it if nessasary and sending the api call, then closing the handleEdit by passing index', () => {
    const testValue = { title: 'Test Task', isActive: true, id: 2 };

    const index = 2;

    const testBooleanValues = [false, false, true];
    component.edit = [...testBooleanValues];
    component.handleSaveEdit(testValue, index);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      putToDos({ toDoItem: testValue })
    );
    expect(component.edit[index]).toBe(false);
    expect(component.edit).toEqual([false, false, false]);
  });

  it('should handle check marking the task as complete by sending put request and then triggering get request for all the data', () => {
    const testValue = { title: 'Test Task', isActive: true, id: 2 }; // Ensure isActive is initially set to true

    component.handleCheck(testValue);

    const expectedPutAction = putToDos({
      toDoItem: { title: 'Test Task', isActive: false, id: 2 },
    });
    const expectedGetAction = TriggerToDoGet();

    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedPutAction);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedGetAction);
  });

  it('should dispatch TriggerToDoGet and subscribe to the slector to get all the tasks', () => {
    const fakeList = [{ id: 1, title: 'task 1', isActive: false }];
    mockStore.select.and.returnValue(of(fakeList));

    component.ngOnInit();

    const getalltasks = TriggerToDoGet();
    expect(mockStore.dispatch).toHaveBeenCalledWith(getalltasks);

    expect(component.list).toEqual(fakeList);
    expect(component.edit).toEqual(new Array(fakeList.length).fill(false));
  });
  it('should create', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
