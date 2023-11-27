import { FileMetaDataModel } from "../../files/file-meta-data-model";
import { TransactionEntryListItem } from "../transaction-entry-model";
import { adjustingFrequency } from "src/app/shared/enums/journals/adjustingFrequency";

export interface CreateJournalEntryDto {
    name: string;
    description?: string;
    transactions: TransactionEntryListItem[];
    files?: FileMetaDataModel[];
    adjustedEntry: {
        isAdjusted: boolean;
        adjustingAmount: number;
        adjustedRange: adjustingFrequency;
      }
}