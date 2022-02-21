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
    type: 'ARNU';
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

export interface DBBorrower {
    customerId: string;
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
    accountno: string;
    ifsccode: string;
    bank: string;
    branch: string;
    bankaddress: string;
    monthlysalary: number;
    companyname: string;
    referralname: string;
    referralphone: string;
    guarantorname: string;
    guarantorphone: string;
    guarantoremail: string;
    guarantoraddress: string;
    experience: number;
    
}

export interface DBLender {
    customerId: string;
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
    accountno: string;
    ifsccode: string;
    bank: string;
    branch: string;
    bankaddress: string;
    monthlysalary: number;
    companyname: string;
    referralname: string;
    referralphone: string;
    guarantorname: string;
    guarantorphone: string;
    guarantoremail: string;
    guarantoraddress: string;
    experience: number;
    
}



