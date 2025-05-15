// updated dynamically on any UX they are embedded in
// can be changed from anywhere in an application
import type { Agency, Roster } from "./types/roster-types";

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({
  email: "",
  name: "",
  token: "",
  _id: ""
});
export const currentRosters = $state({ rosters: [] as Roster[] });
export const currentAgencies = $state({ agencies: [] as Agency[] });
export const currentDataSets = $state({
  rostersByProfession: {
    labels: ["nurse", "doctor"],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  },
  rostersByAgency: {
    labels: [],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  }
})

