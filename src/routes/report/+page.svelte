<script lang="ts">
    import { subTitle, loggedInUser } from "$lib/runes.svelte";
    import Card from "$lib/ui/Card.svelte";
    import RosterList from "$lib/ui/RosterList.svelte";
    import { rosterService } from "$lib/services/roster-service";
    import { refreshRosterState } from "$lib/services/roster-utils";
    import type { PageProps } from "./$types";
  
    subTitle.text = "Rosters to Date";
    let { data }: PageProps = $props();
  refreshRosterState(data.rosters, data.agencies);
  </script>
  
  <Card title="Rosters">
    <RosterList />
  </Card>
  