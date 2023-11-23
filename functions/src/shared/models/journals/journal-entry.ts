import { JournalApprovalType } from "../enums/journal-approval-type";
import { FileData } from "../files/file-meta-data";
import { Transaction } from "./transaction";
import {AdjustedEntry} from "./adjusted-entry";

export interface JournalEntry {
    journalId: string;
    /**
     * Array of account IDs
     */
    accounts: string[];
    entryName: string;
    entryDescription?: string;
    /**
     * ISO string of date journal is requested
     */
    creationDate: string;
    approvalType: JournalApprovalType;
    transactions: Transaction[];
    attachedFileCount: number;
    fileData?: FileData[];
    declineComment?: string;
    adjustedEntry: AdjustedEntry;
}
