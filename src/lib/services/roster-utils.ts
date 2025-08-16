import { currentDataSets, currentAgencies, currentRosters, loggedInUser } from "$lib/runes.svelte";
import type { Agency, Roster } from "$lib/types/roster-types";
import type { LeafletMap } from "$lib/ui/LeafletMap.svelte";
import { rosterService } from "./roster-service";



export function computeByProfession(rosterList: Roster[]) {
  rosterList.forEach((roster) => {
    if (roster.profession == "nurse") {
      currentDataSets.rostersByProfession.datasets[0].values[0] += roster.hour;
    } else if (roster.profession == "doctor") {
      currentDataSets.rostersByProfession.datasets[0].values[1] += roster.hour;
    }
  });
}

export function computeByAgency(rosterList: Roster[], agencies: Agency[]) {
  currentDataSets.rostersByAgency.labels = [];
  agencies.forEach((agency) => {
    currentDataSets.rostersByAgency.labels.push(
      // @ts-ignore
    `${agency.code}, ${agency.AgencyName}`);
    currentDataSets.rostersByAgency.datasets[0].values.push(0);
  });

  agencies.forEach((agency, i) => {
    rosterList.forEach((roster) => {
      if (typeof roster.agency !== "string") {
        if (roster.agency._id == agency._id) {
          currentDataSets.rostersByAgency.datasets[0].values[i] += roster.hour;
        }
      }
    });
  });
}

//
export async function refreshRosterMap (map:LeafletMap) {
  const rosters = await rosterService.getRosters(loggedInUser.token);
  rosters.forEach((roster: Roster) => {
    if (typeof roster.agency !== "string") {
      const popup = `${roster.agency.code} ${roster.agency.AgencyName}: €${roster.hour}`;
      map.addMarker(roster.lat, roster.lng, popup);
    }
  });
  const lastRoster = rosters[rosters.length - 1];
  if (lastRoster) {
  map.moveTo(lastRoster.lat, lastRoster.lng);
} else {
  map.moveTo(52.160858, -7.15242);
}
  //if (lastRoster) map.moveTo(lastRoster.lat, lastRoster.lng);
}
 



export function clearRosterState() {
  currentRosters.rosters = [];
  currentAgencies.agencies = [];
  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";
}

//Receives data from the server, Calls refreshRosterState to populate global state
export async function refreshRosterState(rosters: Roster[], agencies: Agency[]) {
  currentRosters.rosters = rosters;
  currentAgencies.agencies = agencies;
  computeByProfession(currentRosters.rosters);
  computeByAgency(currentRosters.rosters, currentAgencies.agencies);
}

