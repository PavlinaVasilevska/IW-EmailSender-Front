import { EmailJobDTO } from './email-job.dto.model';

export enum StatusEnum {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING'
}

export interface OccurrenceDTO {
  uuid: string;
  status: StatusEnum;
  errorDescription?: string;
  emailJob: EmailJobDTO;
}
