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
export interface PaymentMandate {
    relatedIdentifier: string;
    paymentScheme: string;
    mandateDescription: string;
    validFromDate: string;
    validToDate: string;
    amountType: "VARIABLE";
    mandateCurrency: "USD";
    collectionFrequency: "ADHOC";
    creditAccountId: "010100294280000"; //FIJO ACCOUNT
    creditBankIdentifier: "089999";
    debitBankIdentifier: "090013";
    debitAccountType: "BBAN";
    debitAccountId: string; //last 8 digits of customer account
    debitCustomerCountry: "US";
}