import { FileData } from "../../files/file-meta-data";
import { TransactionEntryListItem } from "../transaction-entry";

export interface CreateJournalEntryDto {
    name: string;
    description?: string;
    transactions: TransactionEntryListItem[];
    files?: FileData[];
}