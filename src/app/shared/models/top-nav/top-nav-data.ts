import { TopNavActionModel } from "./action/top-nav-action";

export interface TopNavData {
    topNavHeader: string;
    topNavIcon: string;
    topNavAction?: TopNavActionModel;
}