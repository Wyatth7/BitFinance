import { JournalEntryModel } from "../journal-entry-model";

export interface EntryListResponseDto {
    approved: JournalEntryModel[],
    requested: JournalEntryModel[],
    declined: JournalEntryModel[],
}