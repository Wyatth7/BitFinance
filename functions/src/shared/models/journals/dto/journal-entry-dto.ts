import { FileData } from "../../files/file-meta-data";
import { AccountEntryDto } from "./account-entry-dto";

export interface JournalEntryDto {
    entryName: string;
    description?: string;
    totalDebits: number;
    totalCredits: number;
    createdOn: string;
    files?: FileData[];
    accountEntries: AccountEntryDto[];
}