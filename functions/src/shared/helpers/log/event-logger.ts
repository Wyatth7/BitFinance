import * as logger from 'firebase-functions/logger'
import * as admin from 'firebase-admin';
import { FirestoreCollections } from "../../enums/firestore-collections";
import { EventLogModel } from '../../models/event-log/event-log-model';

export abstract class EventLogger {

    public static async createEventLog(eventData: EventLogModel) {
        if (!eventData)
            logger.warn("Trying to save null EventData {}", eventData);
            return;
        try {
            await admin.firestore().collection(FirestoreCollections.eventLogs).doc().set(eventData);
        } catch (error) {
            logger.error(error);
        }
    }

    public static async getEventLog(eventLogId: string) { 
        try {
            const eventLogSnapshot = await admin.firestore()
                            .collection(FirestoreCollections.eventLogs.valueOf().toString())
                            .where('uid', '==', eventLogId).get();

            if (eventLogSnapshot.empty) {
                logger.error("EventData with id {} is not found.", eventLogId);
                return null;
            }

            let eventLog: EventLogModel | null = null;
            
            eventLogSnapshot.forEach(eventLogDoc => {
                eventLog = eventLogDoc.data() as EventLogModel;
            });

            return eventLog;
        } catch (error) {
            logger.error(error);
            return null;
        }
    }

    public static async getEventLogList() {
        try {
            const eventLogSnapshot = await admin.firestore()
                                    .collection(FirestoreCollections.users.valueOf().toString())
                                    .get();

            if (eventLogSnapshot.empty) {
                return null;
            }

            let eventLogList: EventLogModel[] | EventLogModel[] = new Array();
            
            eventLogSnapshot.forEach(eventLogDoc => {
                const eventLog = eventLogDoc.data() as EventLogModel;
                eventLogList?.push(eventLog);
            });

            return eventLogList;
        } catch (error) {
            logger.error(error);
            return null;
        }
    }
}