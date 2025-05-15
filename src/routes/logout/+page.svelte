<script lang="ts">
    import { goto } from "$app/navigation";
    import { rosterService } from "$lib/services/roster-service";

  rosterService.clearSession();
    goto("/");
  </script>
  