import { JournalEntry } from "../journal-entry";

export interface EntryListResponseDto {
    approved: JournalEntry[],
    requested: JournalEntry[],
    declined: JournalEntry[],
}