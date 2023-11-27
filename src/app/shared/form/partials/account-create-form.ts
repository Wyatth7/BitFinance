export interface CreateAccountForm {
    general: {
        accountName: string;
        accountNumber: number;
        description: string;
        balance: number;
    };
    types: {
        accountType: any;
        accountSubType: any;
        normalType: any;
        statementType: any;
    }
}