export interface Session {
    name: string;
    _id: string;
    token: string;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
  }

  export interface Agency {
    AgencyName: string;
    code: string;
    office: string;
    _id: string;
  }
  
  export interface Roster {
    hour: number;
    profession: string;
    agency: Agency | string;
    staff: User | string;
    lat: number;
    lng: number;
  }

  export interface DataSet {
    labels: string[];
    datasets: [{ values: number[] }];
  }
  