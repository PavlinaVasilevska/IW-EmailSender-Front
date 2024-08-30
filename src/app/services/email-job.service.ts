import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailJobDTO } from '../models/email-job.dto.model';

@Injectable({
  providedIn: 'root'
})
export class EmailJobService {
  private apiUrl = 'http://localhost:8080/api/emailjobs';
  constructor(private http: HttpClient) {}

  getAllEmailJobs(): Observable<EmailJobDTO[]> {
    return this.http.get<EmailJobDTO[]>(this.apiUrl);
  }

  getEmailJobByUuid(uuid: string): Observable<EmailJobDTO> {
    return this.http.get<EmailJobDTO>(`${this.apiUrl}/${uuid}`);
  }

  createEmailJob(emailJob: EmailJobDTO): Observable<EmailJobDTO> {
    return this.http.post<EmailJobDTO>(this.apiUrl, emailJob);
  }


  updateEmailJob(uuid: string, emailJob: EmailJobDTO): Observable<EmailJobDTO> {
    return this.http.put<EmailJobDTO>(`${this.apiUrl}/${uuid}`, emailJob);
  }

  deleteEmailJob(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`);
  }
}
