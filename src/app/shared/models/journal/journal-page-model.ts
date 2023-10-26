import { FileMetaDataModel } from "../files/file-meta-data-model";
import { JournalPageAccountEntryModel } from "./journal-page-account-entry-model";

export interface JournalEntryPageModel {
    entryName: string;
    description?: string;
    totalDebits: number;
    totalCredits: number;
    createdOn: string;
    files?: FileMetaDataModel[];
    accountEntries: JournalPageAccountEntryModel[];
}