import { JournalApprovalType } from "../../enums/journal-approval-type";
import { FileData } from "../../files/file-meta-data";
import { AccountEntryDto } from "./account-entry-dto";

export interface JournalEntryDto {
    journalId: string;
    entryName: string;
    description?: string;
    totalDebits: number;
    totalCredits: number;
    createdOn: string;
    approvalType: JournalApprovalType;
    files?: FileData[];
    accountEntries: AccountEntryDto[];
    declineComment?: string;
}