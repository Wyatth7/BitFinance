export interface CreateAccountForm {
    general: {
        accountName: string;
        accountNumber: number;
        description: string;
        balance: number;
    };
    types: {
        accountType: any;
        normalType: any;
        statementType: any;
    }
}