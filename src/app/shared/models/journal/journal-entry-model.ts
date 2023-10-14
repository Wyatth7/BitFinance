import { JournalApprovalType } from "../../enums/journals/journal-entry-approval-type";
import { FileMetaDataModel } from "../files/file-meta-data-model";
import { TransactionEntryListItem } from "./transaction-entry-model";

export interface JournalEntryModel {
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
    transactions: TransactionEntryListItem[];
    attachedFileCount: number;
    fileData?: FileMetaDataModel[];
}