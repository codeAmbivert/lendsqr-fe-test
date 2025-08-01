interface Guarantor {
  name: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

export interface User {
  _id: string;
  organization: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
  bvn: number;
  gender: string;
  maritalStatus: string;
  children: string;
  residenceType: string;
  educationLevel: string;
  employmentStats: string;
  sector: string;
  employmentDuration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  guarantor: Guarantor[];
}

export interface Filters {
    organization: string;
    username: string;
    email: string;
    dateJoined: Date | null;
    phoneNumber: string;
    status: string;
  }