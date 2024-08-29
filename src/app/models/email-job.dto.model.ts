import { OccurrenceDTO } from './occurrence.dto.model';

export enum FrequencyEnum {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export interface EmailJobDTO {
  uuid: string;
  startDate: Date;
  endDate?: Date;
  enabled: boolean;
  emailTemplate: {
    uuid: string;
  };
  sender: {
    uuid: string;
  };
  receivers: string[];
  frequency: FrequencyEnum;
  occurrences: OccurrenceDTO[];
}
