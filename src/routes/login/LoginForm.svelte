<script lang="ts">
    import { goto } from "$app/navigation";
    import { loggedInUser } from "$lib/runes.svelte";
    import { rosterService } from "$lib/services/roster-service";
    import Message from "$lib/ui/Message.svelte";
    import UserCredentials from "$lib/ui/UserCredentials.svelte";
  
    let email = $state("");
    let password = $state("");
    let message = $state("");
    const ADMIN_EMAIL = "homer@simpson.com";
    const ADMIN_PASSWORD = "secret";
  
    async function login() {
      // Fallback defaults
     
      console.log(`attempting to log in email: ${email} with password: ${password}`);
      let session = await rosterService.login(email, password);
      if (session) {
      loggedInUser.email = email;
      goto("/roster");
      } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
    }
  </script>
  
  <div class="box">
    {#if message}
      <Message {message} />
    {/if}
    <UserCredentials bind:email bind:password />
    <button onclick={() => login()} class="button">Log In</button>
  </div>
  