import { JournalApprovalType } from "../../enums/journals/journal-entry-approval-type";
import { FileMetaDataModel } from "../files/file-meta-data-model";
import { JournalPageAccountEntryModel } from "./journal-page-account-entry-model";

export interface JournalEntryPageModel {
    journalId: string;
    entryName: string;
    description?: string;
    totalDebits: number;
    totalCredits: number;
    balance: number;
    createdOn: string;
    approvalType: JournalApprovalType;
    files?: FileMetaDataModel[];
    accountEntries: JournalPageAccountEntryModel[];
    declineComment: string;
}