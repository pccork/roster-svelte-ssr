<script lang="ts">
	import { loggedInUser } from "$lib/runes.svelte";
  import { rosterService } from "$lib/services/roster-service";
	import Heading from "$lib/ui/Heading.svelte";
	import Menu from "$lib/ui/Menu.svelte";
  import { onMount } from "svelte";

  onMount(async () => {
    await rosterService.restoreSession();
  });
</script>

<div class="container">
  {#if loggedInUser.email}
    <Menu />
    <Heading />
  {/if}
  <slot />
</div>
  
