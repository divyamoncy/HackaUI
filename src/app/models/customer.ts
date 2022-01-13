export interface Address {
    addressType: 'RESIDENTIAL';
    country: 'IN';
    line1: string;
    line2: string;
    line3?: string;
    line4?: string;
    line5?: string;
    postalCode?: string;
    buildingNumber?: string;

  }
export interface PhoneNumber {
    type: 'RESIDENTIAL';
    number: string;

}
export interface Identification {
    type: 'NIDN';
    id: string;

}
export interface fatcaDetails {
    isUSResident: false;
    isUSTaxResident: false;
    tin: string;

}
export interface EmailAddress {
    type: 'HOME';
    address: string;

}
export interface Customer {
    branchCode: "FIJO1";
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    gender?: string;
    title?: string;
    countryOfResidency: 'IN';
    address?: Address[];
    phoneNumber: PhoneNumber[];
    emailAddress: EmailAddress[];
    identification: Identification;
    fatcaDetails: fatcaDetails;
    kycCheckRequired: 'CORE-DEFINED';
}



