<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { clearRosterState } from "$lib/services/roster-utils";

    clearRosterState();
  if (browser) goto("/");
</script>
  