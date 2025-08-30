import type { Agency } from "$lib/types/roster-types";

export const defaultAgencies: Agency[] = [ 
  { _id: "clinistaff", AgencyName: "Clinistaff", code: "DOC-T-1", office: "MediAgency" },
  { _id: "allcare", AgencyName: "AllCare", code: "NUR-F-1", office: "NurseAgency" }, 
  { _id: "nurseLink", AgencyName: "NurseLink", code: "NUR-T-1", office: "NurseAgency" }
];