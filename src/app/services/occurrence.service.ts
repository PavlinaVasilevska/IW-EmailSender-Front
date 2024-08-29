import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OccurrenceDTO } from '../models/occurrence.dto.model';

@Injectable({
  providedIn: 'root',
})
export class OccurrenceService {
  private apiUrl = 'http://localhost:8080/api/occurrences';

  constructor(private http: HttpClient) {}

  getOccurrencesByEmailJob(emailJobUuid: string): Observable<OccurrenceDTO[]> {
    return this.http.get<OccurrenceDTO[]>(`${this.apiUrl}/email-jobs/${emailJobUuid}/occurrences`);
  }

  getOccurrenceByUuid(uuid: string): Observable<OccurrenceDTO> {
    return this.http.get<OccurrenceDTO>(`${this.apiUrl}/occurrences/${uuid}`);
  }

  createOccurrence(occurrence: OccurrenceDTO): Observable<OccurrenceDTO> {
    return this.http.post<OccurrenceDTO>(`${this.apiUrl}/occurrences`, occurrence);
  }

  updateOccurrence(uuid: string, occurrence: OccurrenceDTO): Observable<OccurrenceDTO> {
    return this.http.put<OccurrenceDTO>(`${this.apiUrl}/occurrences/${uuid}`, occurrence);
  }

  deleteOccurrence(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/occurrences/${uuid}`);
  }
}
