import { HelperActionModel } from "./helper-action-model";

export interface AuthenticationFormModel {
    pageHeader: string;
    actionButtonText: string;
    actionAsync: () => Promise<void>,
    helperActionLeft?: HelperActionModel;
    helperActionRight?: HelperActionModel;
    form: any;
}