<script lang="ts">
    import { subTitle, loggedInUser } from "$lib/runes.svelte";
    import Card from "$lib/ui/Card.svelte";
    import RosterList from "$lib/ui/RosterList.svelte";
    import { rosterService } from "$lib/services/roster-service";
    import { onMount } from "svelte";
    import type { Roster } from "$lib/types/roster-types";
  
    subTitle.text = "Rosters to Date";
    let rosters: Roster[] = [];
    onMount(async () => {
      rosters = await rosterService.getRosters(loggedInUser.token);
      
  });
  </script>
  
  <Card title="Rosters">
    <RosterList />
  </Card>
  