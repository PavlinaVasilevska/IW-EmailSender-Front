import { RoleDTO } from './role.dto.model';

export interface UserDTO {
  uuid: string;
  createdOn: Date;
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  roles: RoleDTO[];
}
