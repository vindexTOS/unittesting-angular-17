import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../env';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllList and return data', () => {
    const mockData = [{ id: 1, title: 'Task 1', isActive: false }];

    service.getAllList().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
    httpTestingController.verify();
  });

  it('should create new list and return response', () => {
    const mockData = { id: 1, title: 'Task 1', isActive: false };
    service.postList(mockData).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockData);
    req.flush(mockData);
    httpTestingController.verify();
  });

  it('should delete task from list ', () => {
    const id = '1';
    service.deleteList(id).subscribe((data) => {
      expect(data).toBeTruthy();
    });
    const req = httpTestingController.expectOne(`${environment.apiUrl}/${id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
    httpTestingController.verify();
  });

  it('should update task item', () => {
    const mockData = { id: 1, title: 'Task 2', isActive: false };

    service.putList(mockData).subscribe((data) => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.apiUrl}`);

    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockData);

    req.flush(mockData);
    httpTestingController.verify();
  });
});
