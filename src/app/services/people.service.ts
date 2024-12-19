import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User, UserResponse } from '../models/user.model';
import { API_URL } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  getPeople(page: number = 1): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${API_URL}/users?page=${page}`);
  }

  getPerson(id: number): Observable<User> {
    return this.http.get<{ data: User }>(`${API_URL}/users/${id}`).pipe(
      map((response) => response.data)
    );
  }

  updatePerson(id: number, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${API_URL}/users/${id}`, data);
  }
}