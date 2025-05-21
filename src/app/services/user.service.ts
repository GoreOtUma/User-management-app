import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  website?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/${id}`);
}


deleteUser(id: number) {
  return this.http.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
}

updateUser(id: number, data: any) {
  return this.http.put(`https://jsonplaceholder.typicode.com/users/${id}`, data);
}

createUser(data: any) {
  return this.http.post(`https://jsonplaceholder.typicode.com/users`, data);
}

}
