import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { toDoItem } from '../../store/ToDoSlice';

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
  it('should create', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
