import { SuspendedAccountModel } from "../auth/suspended-model";

export interface SuspendUserModel {
    uid: string;
    suspendDates: SuspendedAccountModel
}