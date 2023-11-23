export interface AccountEntry {
    entryName: string;
    journalId: string;
    debit: number;
    credit: number;
    balance: number;
    creationDate: string;
    isAdjusted: boolean;
}
