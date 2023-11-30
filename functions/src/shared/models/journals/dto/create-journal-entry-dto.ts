import { FileData } from "../../files/file-meta-data";
import { TransactionEntryListItem } from "../transaction-entry";
import {AdjustedEntry} from "../adjusted-entry";

export interface CreateJournalEntryDto {
    name: string;
    description?: string;
    transactions: TransactionEntryListItem[];
    files?: FileData[];
    adjustedEntry: AdjustedEntry;
}
