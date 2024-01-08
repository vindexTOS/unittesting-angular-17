import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { ListComponent } from '../list/list.component';
import { AddComponent } from '../add/add.component';
import { StoreModule } from '@ngrx/store';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainComponent,
        ListComponent,
        AddComponent,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MainComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
