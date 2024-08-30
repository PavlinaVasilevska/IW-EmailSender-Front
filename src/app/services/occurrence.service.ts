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
    return this.http.get<OccurrenceDTO[]>(`${this.apiUrl}/email-job/${emailJobUuid}`);
  }


  getOccurrenceByUuid(uuid: string): Observable<OccurrenceDTO> {
    return this.http.get<OccurrenceDTO>(`${this.apiUrl}/occurrences/${uuid}`);
  }

}
