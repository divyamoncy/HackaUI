export interface AccountAdditionalDetails {
    modeOfOperation: string;
    accountName?: string;
    postingRestriction: "NONE";
}
export interface Account {
    customerId: string;
    productId: "01010DEFAULTUSD";
    accountOwnership: string; //"SOLE" or "JOINT"
    accountAdditionalDetails: AccountAdditionalDetails;
}