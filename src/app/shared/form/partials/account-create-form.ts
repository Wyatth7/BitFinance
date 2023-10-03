export interface CreateAccountForm {
    general: {
        accountName: string;
        accountNumber: string;
        description: string;
        balance: number;
    };
    types: {
        accountType: any;
        normalType: any;
        statementType: any;
    }
}