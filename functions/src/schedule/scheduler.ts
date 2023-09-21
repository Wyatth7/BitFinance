import {onSchedule} from 'firebase-functions/v2/scheduler';
import * as admin from "firebase-admin";
import { FirestoreCollections } from '../shared/enums/firestore-collections';
import { UserWithIdModel } from '../shared/models/users/user-with-id-model';

export const unsuspendSchedule = onSchedule("every day 04:00", async () => {
    const usersSnapshot = await admin.firestore().collection(FirestoreCollections.users.toString())
    .where('suspended', '!=', null)
    .get();
    
    const today = new Date();
    usersSnapshot.forEach(async (userData) => {
        const processedData = userData.data() as UserWithIdModel;

        if (processedData.suspended && new Date(processedData.suspended.end) <= today) {
            await admin.auth().updateUser(processedData.uid, {disabled: false})
            await admin.firestore().doc(processedData.uid).update({suspended: null})
        }
    });
});

export const suspendSchedule = onSchedule("every day 04:00", async () => {
    const usersSnapshot = await admin.firestore().collection(FirestoreCollections.users.toString())
    .where('suspended', '!=', null)
    .get();
    
    const today = new Date();
    usersSnapshot.forEach(async (userData) => {
        const processedData = userData.data() as UserWithIdModel;

        if (processedData.suspended && new Date(processedData.suspended.start) <= today && new Date(processedData.suspended.end) > today) {
            const user = await admin.auth().getUser(processedData.uid);

            if (user.disabled) return;

            await admin.auth().updateUser(processedData.uid, {disabled: true})
        }
    });
});