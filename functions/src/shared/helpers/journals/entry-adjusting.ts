import * as admin from 'firebase-admin';
import {FirestoreCollections} from "../../enums/firestore-collections";
import {JournalEntry} from "../../models/journals/journal-entry";
import {EntryCalculations} from "../calculations/entry-calculations";
import {Guid} from "../guids/generate-guid";
import {AccountModel} from "../../models/accounts/account-model";
import {AccountEntry} from "../../models/journals/account-journal";
import {FirebaseSubCollections} from "../../enums/firestore-sub-collections";
import {NormalType} from "../../enums/accounts/normal-type";

export class EntryAdjusting {

  static async adjustEntry(journalId: string, date: Date) {
    // get journal entry from DB

    const entrySnapshot = await admin.firestore()
      .collection(FirestoreCollections.journals)
      .doc(journalId)
      .get();

    if (!entrySnapshot.exists) return;

    const entry = entrySnapshot.data() as JournalEntry;

    // if not adjusted return
    if (!entry.adjustedEntry.isAdjusted) return;

    // calculate adjusted total
    const amountToAdjust = EntryCalculations.adjustEntry(entry.adjustedEntry.adjustedRange, entry.adjustedEntry.adjustingAmount, date)

    // create a copy of the journal entry, but adjust the
    // account balances with amount to adjust

    const adjustedJournalId = Guid.createGuid();
    entry.entryName = `Adjusted ${entry.entryName}`

    for (const transaction of entry.transactions) {
      if (transaction.normalType === NormalType.debit) {
        transaction.amount += amountToAdjust;
      } else {
        transaction.amount -= amountToAdjust;
      }
    }

    await admin.firestore()
      .collection(FirestoreCollections.journals)
      .doc(adjustedJournalId)
      .set(entry)


    // add an account entry to each account associated
    await this.updateAccounts(entry, amountToAdjust);
  }

  private static async updateAccounts(journalEntry: JournalEntry, amountToAdjust: number) {
    const accountSnapshot = await admin.firestore()
      .collection(FirestoreCollections.accounts)
      .where('accountId', 'in', journalEntry.accounts)
      .get();

    if (accountSnapshot.empty) throw new Error('Account list empty.');

    const accounts = accountSnapshot.docs.map(account => account.data() as AccountModel);

    const batch = admin.firestore().batch();

    for (const account of accounts) {
      // update balances for account
      const newBalance = account.balance - amountToAdjust;
      const entryCount = account.entries + 1;

      batch.update(
        admin.firestore()
          .collection(FirestoreCollections.accounts)
          .doc(account.accountId),
        {balance: newBalance, entries: entryCount}
      )

      // create account level journal data
      const accountJournal: AccountEntry = {
        journalId: journalEntry.journalId,
        entryName: journalEntry.entryName,
        debit: newBalance,
        credit: newBalance,
        creationDate: journalEntry.creationDate,
        balance: newBalance,
        isAdjusted: journalEntry.adjustedEntry.isAdjusted
      }

      // add entry to account
      const guid = Guid.createGuid();
      batch.create(
        admin.firestore()
          .collection(FirestoreCollections.accounts)
          .doc(account.accountId)
          .collection(FirebaseSubCollections.accountJournal)
          .doc(guid),
        accountJournal
      );
    }

    await batch.commit();
  }

}
