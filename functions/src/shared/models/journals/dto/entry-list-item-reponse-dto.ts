import { JournalApprovalType } from "../../enums/journal-approval-type";

export interface EntryListItemResponseDto {
    journalId: string;
    entryName: string;
    entryDescription?: string;
    totalDebit: number;
    totalCredit: number;
    balance: number;
    creationDate: string;
    approvalType: JournalApprovalType;
}