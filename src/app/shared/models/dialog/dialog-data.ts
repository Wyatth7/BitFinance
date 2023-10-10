export interface DialogData {
    title: string;
    data: any;
    action?: (...args: any) => Promise<void>; 
}