import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { JournalEntryBaseModel } from '../../models/journal/journal-entry-base-model';
import { SnackBarService } from '../component-services/snack-bar.service';
import { JournalFunctions } from '../../enums/firebase-functions/journal-functions';
import { CreateJournalEntryDto } from '../../models/journal/create-journal-entry-dto';
import { FileMetaDataModel } from '../../models/files/file-meta-data-model';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(
    private functions: Functions,
    private snackBarService: SnackBarService
  ) { }

  async createJournalEntry(journalEntry: JournalEntryBaseModel) {

    const createJournalFunction = httpsCallable(this.functions, JournalFunctions.createJournalEntry);

    try {

      let files: FileMetaDataModel[] = []

      if (journalEntry.files) {
        for (let i = 0; i < journalEntry.files.length; i++) {
          const file = journalEntry.files[i];
          const base64String = await toBase64(file) as string;
          console.log(base64String);
        
          files.push({
            friendlyName: file.name,
            contentType: file.type,
            size: file.size,
            base64File: base64String
          })
        }
      }

      console.log(files);
      
      const createDto: CreateJournalEntryDto = {
        name: journalEntry.name,
        description: journalEntry.description,
        transactions: journalEntry.transactions,
        files
      }
      
      await createJournalFunction(createDto);

      this.snackBarService.showSuccess('Journal entry created. Awaiting Approval.');

    } catch (error) {
      this.snackBarService.showError('Journal entry creation failed.');
    }

  }

}

const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});