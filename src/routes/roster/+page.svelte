<script lang="ts">
    import { currentDataSets, subTitle } from "$lib/runes.svelte";
    import Card from "$lib/ui/Card.svelte";
    import RosterForm from "./RosterForm.svelte";
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import RosterList from "$lib/ui/RosterList.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
    import type { Roster } from "$lib/types/roster-types";
    import { rosterService } from "$lib/services/roster-service";
    import { refreshRosterMap } from "$lib/services/roster-utils";

    subTitle.text = "Roster Entry";
    let map: LeafletMap;

    function rosterMade(roster:Roster) {
    map.addMarker(roster.lat, roster.lng, "");
    map.moveTo(roster.lat, roster.lng);
    }


    onMount(async () => {
      await refreshRosterMap(map);
    });


  </script>
  
  <div class="columns">
    <div class="column">
      <Card title="Rosters Geo Data">
        <LeafletMap height={40} bind:this={map} />
      </Card>
    </div>
    <div class="column">
      <Card title="Rosters to Date">
        <RosterForm rosterEvent={rosterMade}/>
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
      <Card title="Enter Roster hour">
        <RosterList />
      </Card>
    </div>
  </div>