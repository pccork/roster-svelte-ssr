<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import RosterList from "$lib/ui/RosterList.svelte";
  import { subTitle } from "$lib/runes.svelte";
  import { refreshRosterState } from "$lib/services/roster-utils";
  import type { PageProps } from "./$types";

  subTitle.text = "Roster to Date";
  let { data }: PageProps = $props();
  refreshRosterState(data.rosters, data.candidates);
</script>

<Card title="Rosters">
  <RosterList />
</Card>