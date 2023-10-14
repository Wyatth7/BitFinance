import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { JournalEntryBaseModel } from '../../models/journal/journal-entry-base-model';
import { SnackBarService } from '../component-services/snack-bar.service';
import { JournalFunctions } from '../../enums/firebase-functions/journal-functions';
import { CreateJournalEntryDto } from '../../models/journal/dto/create-journal-entry-dto';
import { FileMetaDataModel } from '../../models/files/file-meta-data-model';
import { JournalEntryModel } from '../../models/journal/journal-entry-model';
import { Subject } from 'rxjs';
import { EntryListResponseDto } from '../../models/journal/dto/entry-list-response-dto';
import { LoaderService } from '../component-services/loader.service';
import { DialogService } from '../dialogs/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  jounals$ = new Subject<EntryListResponseDto>()

  constructor(
    private functions: Functions,
    private loaderService: LoaderService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService
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

    await this.getJournals();
  }

  async getJournals() { 
    this.loaderService.showLoader('Journal Entries');

    const getJournalListFunctions = httpsCallable<null, EntryListResponseDto>(this.functions, JournalFunctions.getJournalList);

    try {
      const journalList = await getJournalListFunctions();

      this.jounals$.next(journalList.data);
    } catch (error) {
      console.log(error);
      this.dialogService.openErrorDialog({
        title: 'Journal Entry Load Failed',
        data: 'There was an issue loading journal entries from the server. Refresh the page or try again later if the problem continues.'
      })
    }

    this.loaderService.stopLoader();

  }

}

const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});