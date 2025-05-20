<script lang="ts">
    //import { goto } from "$app/navigation";
    //import { loggedInUser } from "$lib/runes.svelte";
    //import { rosterService } from "$lib/services/roster-service";
    import Message from "$lib/ui/Message.svelte";
    import UserCredentials from "$lib/ui/UserCredentials.svelte";
    let message = "";
</script>
  
    
  
  
{#if message}
  <Message {message} />
{/if}
<form method="POST" action="?/login">
  <UserCredentials />
  <button class="button is-success is-fullwidth">Log In</button>
</form>