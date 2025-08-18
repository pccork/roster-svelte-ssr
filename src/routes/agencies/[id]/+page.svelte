<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import AgencyRosters from "$lib/ui/AgencyRosters.svelte";
  import { subTitle } from "$lib/runes.svelte";

  let { data }: any = $props();
  subTitle.text = `Roster to Date for ${data.agency.AgencyNameName} ${data.agency.code}`;
</script>

<Card title="Rosters">
  <AgencyRosters rosters={data.rosters} />
</Card>
