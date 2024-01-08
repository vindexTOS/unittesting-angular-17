import { Injectable } from '@angular/core';
import { environment } from '../env';
import { HttpClient } from '@angular/common/http';
import { toDoItem } from '../store/ToDoSlice';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllList() {
    return this.http.get(`${this.baseUrl}`);
  }
  postList(Task: toDoItem) {
    console.log(Task);
    return this.http.post(`${this.baseUrl}`, { ...Task });
  }
  deleteList(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  putList(body: toDoItem) {
    return this.http.put(`${this.baseUrl}`, { ...body });
  }
}
