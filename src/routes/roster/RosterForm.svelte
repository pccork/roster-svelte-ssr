<script lang="ts">
  import { enhance } from "$app/forms";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  
  let { agencyList = [], enhanceFn, message = $bindable(""), lat: latProp = 52.160858, lng: lngProp = -7.15242} = $props();
  let lat = $state(latProp);
  let lng = $state(lngProp);
  //let lat = 52.160858;
  //et lng = -7.15242;
  let professions = ["doctor", "nurse"];
</script>
  
  <form method="POST" action="?/roster" use:enhance={enhanceFn}>
  <div class="field">
    <label class="label" for="hour">Enter roster hour:</label>
    <input class="input" id="hour" name="hour" type="number" />
  </div>
  <div class="field">
    <div class="control">
      <label class="label" for="hour">Select Profession:</label>
      {#each professions as profession}
        <input class="radio" type="radio" value={profession} name="profession" /> {profession}
      {/each}
    </div>
  </div>
  <div class="field">
    <label class="label" for="hour">Select Agency:</label>
    <div class="select">
      <select name="agency">
        {#each agencyList as agency}
          <option value={agency._id}>{agency.code},{agency.agencyName} </option>
        {/each}
      </select>
    </div>
  </div>
  <Coordinates bind:lat bind:lng />
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Roster</button>
    </div>
  </div>
</form>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
  