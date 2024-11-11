import { RoleDTO } from './role.dto.model';

export interface UserDTO {
  uuid: string;
  createdOn: Date;
  username: string;
  email: string;
  roles: RoleDTO[];
}
