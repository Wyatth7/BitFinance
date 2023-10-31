import { EntryListItemResponseDto } from "./entry-list-item-reponse-dto";

export interface EntryListResponseDto {
    approved: EntryListItemResponseDto[],
    requested: EntryListItemResponseDto[],
    declined: EntryListItemResponseDto[],
}