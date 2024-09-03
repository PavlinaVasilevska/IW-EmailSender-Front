import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EmailTemplateDTO} from "../models/email-template.dto.model";


@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {
  private apiUrl = 'http://localhost:8080/api/email-templates';
  constructor(private http: HttpClient) {}

  getAllEmailTemplates(): Observable<EmailTemplateDTO[]> {
    return this.http.get<EmailTemplateDTO[]>(this.apiUrl);
  }

  createEmailTemplate(emailTemplateDTO: EmailTemplateDTO): Observable<EmailTemplateDTO> {
    return this.http.post<EmailTemplateDTO>(this.apiUrl, emailTemplateDTO);
  }
}
