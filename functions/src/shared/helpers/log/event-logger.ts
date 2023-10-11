import * as logger from 'firebase-functions/logger'
import * as admin from 'firebase-admin';
import { FirestoreCollections } from "../../enums/firestore-collections";
import { EventLogModel } from '../../models/event-log/event-log-model';
import { Guid } from '../guids/generate-guid';

export abstract class EventLogger {

    /**
     * Creates an event in the event logger collection
     * @param eventData Event data model
     */
    public static async createEventLog(eventData: EventLogModel) {
        if (!eventData){
            logger.warn(`Trying to save null EventData ${eventData}`);
            return;
        }

        eventData.eventLogId = Guid.createGuid();
        eventData.dateChanged = new Date().toISOString();

        try {
            await admin.firestore()
                .collection(FirestoreCollections.eventLogs)
                .doc(eventData.eventLogId)
                .set(eventData);
        } catch (error) {
            logger.error(error);
        }
    }

    /**
     * Returns a single event log
     * @param hostId Id of the event log host
     * @returns Event log model
     */
    public static async getEventLog(hostId: string) { 
        try {
            const eventLogSnapshot = await admin.firestore()
                            .collection(FirestoreCollections.eventLogs)
                            .where('hostId', '==', hostId)
                            .get();

            if (eventLogSnapshot.empty) {
                logger.error("EventData with id {} is not found.", hostId);
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

    /**
     * Gets a list of event logs based on host ID
     * @returns List of event log models
     */
    public static async getEventLogList() {
        try {
            const eventLogSnapshot = await admin.firestore()
                                    .collection(FirestoreCollections.eventLogs)
                                    .get();

            if (eventLogSnapshot.empty) {
                return null;
            }

            let eventLogList: EventLogModel[] = [];
            
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