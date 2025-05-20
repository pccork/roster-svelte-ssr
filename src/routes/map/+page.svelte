<script lang="ts">
   import { currentDataSets, loggedInUser, subTitle } from "$lib/runes.svelte";
   import { rosterService } from "$lib/services/roster-service";
   import type { Roster } from "$lib/types/roster-types";
   import { refreshRosterMap, refreshRosterState } from "$lib/services/roster-utils";
   import Card from "$lib/ui/Card.svelte";
   import LeafletMap from "$lib/ui/LeafletMap.svelte";
   import { onMount } from "svelte";
   import type { PageProps } from "./$types";
   
   

  subTitle.text = "Rosters Geo Data";
  let map: LeafletMap;
  let { data }: PageProps = $props();

  onMount(async () => {
    await refreshRosterState(data.rosters, data.agencies);
    await refreshRosterMap(map);
  });
  
</script>
 

  
<Card title="Rosters Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>