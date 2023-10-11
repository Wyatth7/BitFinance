import { LogActionType } from "../enums/log-action-type";
import { FirestoreCollections } from "../../enums/firestore-collections";

export interface EventLogModel {
    beforeChange: any;
    afterChange: any;
    collection: FirestoreCollections;
    logAction: LogActionType;
    userId: string;
    dateChanged: Date;
}