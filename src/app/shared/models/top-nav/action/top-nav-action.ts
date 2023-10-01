import { Roles } from "src/app/shared/enums/authentication/roles";

export interface TopNavActionModel {
    icon: string;
    tooltip: string;
    action: () => void;
    requiredRole?: Roles[]
}