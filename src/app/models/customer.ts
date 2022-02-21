export interface Address {
    addressType: string;
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
    type: string;
    number: string;

}
export interface Identification {
    type: string;
    id: string;

}
export interface fatcaDetails {
    isUSResident: false;
    isUSTaxResident: false;
    tin: string;

}
export interface EmailAddress {
    type: string;
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
    companyName: string;
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

export interface OrganisationCustomer {
    enterpriseName: string;
    registrationNumber : string;
    countryOfRegistration: 'IN';
    address?: Address[];
    phoneNumber: PhoneNumber[];
    emailAddress: EmailAddress[];
    kycCheckRequired: 'CORE-DEFINED';
}

export interface OrganisationCustomerDB {
    enterpriseName: string;
    registrationNumber : string;
    countryOfRegistration: 'IN';
    address?: Address[];
    phoneNumber: PhoneNumber[];
    emailAddress: EmailAddress[];
    kycCheckRequired: 'CORE-DEFINED';
    customerId: string;
    dirFirstName: string;
    dirLastName: string;
    pan: string;
    incorporationDate?: string;
    cin: string;
    fatcaDetails: fatcaDetails;
    accountno: string;
    ifsccode: string;
    bank: string;
    branch: string;
    bankaddress: string;
}



