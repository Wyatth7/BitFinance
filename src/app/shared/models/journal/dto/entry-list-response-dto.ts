import { EntryListItemResponseDto } from "./entry-list-item-response-dto";

export interface EntryListResponseDto {
    approved: EntryListItemResponseDto[],
    requested: EntryListItemResponseDto[],
    declined: EntryListItemResponseDto[],
}