import { TransactionEntryListItem } from "./transaction-entry-model";

export interface JournalEntryBaseModel {
    name: string;
    description?: string;
    transactions: TransactionEntryListItem[];
    files?: File[];
    isAdjusted: boolean;
    adjustingAmount?: number;
    adjustedRange?: number;
}