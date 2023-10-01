export interface Expense{
    id : number;
    userId : string;
    category : number;
    date : Date;
    amount : number;
    description : string;
} 

export interface CategorySummary{
    category : number;
    total : number;
}

export interface CategorySummaryRequest{
    userId : string;
    fromDate : Date | null;
    toDate : Date | null;
}