export interface DialogData {
    title: string;
    data: any;
    action?: () => Promise<void>; 
}