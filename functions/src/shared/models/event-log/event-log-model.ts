import { LogActionType } from "../enums/log-action-type";
import { FirestoreCollections } from "../../enums/firestore-collections";

export interface EventLogModel {
    beforeChange: any;
    afterChange: any;
    /**
     * Collection that this event log belongs to.
     */
    collection: FirestoreCollections;
    logAction: LogActionType;
    userId: string;
    /**
     * Date in ISO string format
     */
    dateChanged: string;
    /**
     * Used as the ID of what is being logged.
     * i.e. an account ID
     */
    hostId: string;
    eventLogId?: string;
}