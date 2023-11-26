import {RatioSummary} from "../ratios/ratio-summary";

export interface OverviewDataModel {
    users: {
        requested: number;
        accepted: number;
    },
    journals: {
        approved: number;
        requested: number;
        declined: number
    },
    accounts: number;
    ratios: RatioSummary;
}
