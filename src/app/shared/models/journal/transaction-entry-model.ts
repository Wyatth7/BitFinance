import { TransactionEntryListItem } from "./journal-entry-model";

export interface JournalEntryModel {
    name: string;
    description?: string;
    transactions: TransactionEntryListItem[];
    files?: File[]
}