/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

import {initializeApp} from "firebase-admin/app";

initializeApp();

export * as scheduler from './schedule/scheduler';
export {testFunc} from './http/test';
export * as auth from './http/auth/user-creation-edit';
export * as users from './http/users/users';
export * as email from './messaging/emailer';