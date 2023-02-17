import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { UserData } from 'src/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private http: HttpClient) {}

  getData(): Observable<Storage> {
    const data = localStorage;
    if (data) {
      return of(data);
    } else {
      const error = new Error('Data not found in local storage');
      return throwError(() => error);
    }
  }

  saveData(key: string, data: UserData): Observable<UserData> {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return of(data);
    } catch (error) {
      console.error(error);
      return throwError(() => 'Error saving data');
    }
  }
}
