import { Roles } from "../../enums/authentication/roles";

export interface MemberModel {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  profilePicture: string;
  role: Roles;
  isActive: boolean;
  }