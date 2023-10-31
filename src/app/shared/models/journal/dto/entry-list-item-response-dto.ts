export interface EntryListItemResponseDto {
    journalId: string;
    entryName: string;
    entryDescription?: string;
    totalDebit: number;
    totalCredit: number;
    balance: number;
    creationDate: string;
}