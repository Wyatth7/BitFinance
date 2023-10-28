export interface OverviewDataModel {
    users: {
        requested: number;
        accepted: number;
        approved: number;
        declined: number;
    },
    accounts: number;
}