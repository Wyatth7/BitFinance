export interface EntryActionDto {
    journalId: string;
    shouldAccept: boolean;
    comment?: string;
}