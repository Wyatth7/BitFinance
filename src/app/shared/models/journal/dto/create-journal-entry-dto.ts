import { FileMetaDataModel } from "../../files/file-meta-data-model";
import { TransactionEntryListItem } from "../transaction-entry-model";

export interface CreateJournalEntryDto {
    name: string;
    description?: string;
    transactions: TransactionEntryListItem[];
    files?: FileMetaDataModel[];
}