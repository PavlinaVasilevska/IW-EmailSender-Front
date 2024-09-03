export class EmailTemplateDTO {
  uuid?: string;
  subject: string;
  body: string;

  constructor(
    uuid: string = '',
    subject: string = '',
    body: string = ''
  ) {
    this.uuid = uuid;
    this.subject = subject;
    this.body = body;
  }
}

