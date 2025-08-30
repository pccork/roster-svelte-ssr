<script lang="ts">
    import { currentDataSets, currentRosters, currentAgencies, loggedInUser, subTitle } from "$lib/runes.svelte";
    import type { ActionResult } from "@sveltejs/kit";
    import Card from "$lib/ui/Card.svelte";
    import RosterForm from "./RosterForm.svelte";
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import RosterList from "$lib/ui/RosterList.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
    import type { Roster } from "$lib/types/roster-types";
   
    import { refreshRosterMap, refreshRosterState } from "$lib/services/roster-utils";
    import type { PageProps } from "./$types";

    subTitle.text = "Roster Entry";
    let { data }: PageProps = $props();
    let message = $state("Please enter Roster!");
    

  const handleRosterSuccess = () => {
    return async ({ result }: { result: ActionResult }) => {
      if (result.type === "success") {
        const roster = result.data as Roster;
        currentRosters.rosters.push(roster);
        map.addMarker(roster.lat, roster.lng, "");
        map.moveTo(roster.lat, roster.lng);
        refreshRosterState(currentRosters.rosters, currentAgencies.agencies);
        message = `Roster entered ${roster.hour} to ${roster.agency.AgencyName} ${roster.agency.code}`;
      }
    };
  };

  let map: LeafletMap;

  onMount(async () => {
    await refreshRosterState(data.rosters, data.agencies);
    await refreshRosterMap(map);
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Rosters to Date">
      <LeafletMap height={50} bind:this={map} />
    </Card>
  </div>
  <div class="column">
    <Card title="Please enter roster">
      <RosterForm agencyList={currentAgencies.agencies} enhanceFn={handleRosterSuccess} {message} />
    </Card>
  </div>
</div>
<div class="columns">
  <div class="column">
    <Card title="Rosters to Date">
      <Chart data={currentDataSets.rostersByAgency} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Enter Roster">
      <RosterList />
    </Card>
  </div>
</div>