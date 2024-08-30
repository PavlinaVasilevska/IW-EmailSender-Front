import { EmailJobDTO } from './email-job.dto.model';

export enum StatusEnum {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface OccurrenceDTO {
  uuid: string;
  createdOn: Date;
  status: StatusEnum;
  errorDescription?: string;
  emailJob: EmailJobDTO;
}
