export interface AccountEntry {
    entryName: string;
    journalId: string;
    description?: string;
    balance: number;
    debit: number;
    credit: number;
    creationDate: string;
}