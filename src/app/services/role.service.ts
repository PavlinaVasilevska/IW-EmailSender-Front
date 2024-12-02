import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleDTO } from '../models/role.dto.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/api/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<RoleDTO[]> {
    return this.http.get<RoleDTO[]>(this.apiUrl);
  }
}
