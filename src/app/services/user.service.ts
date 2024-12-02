import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.dto.model';
import { RoleDTO } from '../models/role.dto.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Base API endpoint for users
  private rolesUrl = 'http://localhost:8080/api/roles'; // API endpoint for roles

  constructor(private http: HttpClient) {}


  getUserByUsername(username: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/username/${username}`);
  }


  getUserByEmail(email: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/email/${email}`);
  }


  getUserByUuid(uuid: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/uuid/${uuid}`);
  }


  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.apiUrl);
  }


  createUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.apiUrl, user);
  }


  updateUser(userUuid: string, updatedFields: Partial<UserDTO>): Observable<UserDTO> {
    const fieldsToUpdate = { ...updatedFields, uuid: userUuid }; // Ensure uuid is set


    return this.http.put<UserDTO>(`${this.apiUrl}/${userUuid}`, fieldsToUpdate);
  }


  deleteUser(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`);
  }


  getRoles(): Observable<RoleDTO[]> {
    return this.http.get<RoleDTO[]>(this.rolesUrl);
  }
}
