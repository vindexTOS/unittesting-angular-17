import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { postToDos } from '../../store/ToDoSlice';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, AddComponent],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update task property on input change', () => {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    const testValue = 'Test Task';

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.task).toEqual(testValue);
  });
  it('should dispatch postToDos action when addTask is called', () => {
    component.task = 'Test Task';

    component.addTask();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      postToDos({ toDoItem: { title: 'Test Task', isActive: true } })
    );
    expect(component.task).toBe('');
  });

  it('should not dispatch postToDo if addTask is called with empty task', () => {
    component.task = '';

    component.addTask();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
