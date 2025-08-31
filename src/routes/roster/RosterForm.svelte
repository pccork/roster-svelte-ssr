<script lang="ts">
  import { enhance } from "$app/forms";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import { defaultAgencies } from "$lib/constants/agencies";
  
  //agencyList = agencyList.length ? agencyList : defaultAgencies;
 
  let lat = $state(52.160858);
  let lng = $state(-7.15242);

  let { agencyList = [], enhanceFn, message = $bindable("") } = $props();
  agencyList = Array.isArray(agencyList) && agencyList.length > 0? agencyList : defaultAgencies;
  
  console.log("Agency list in form:", agencyList);
  
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
      <div class="control">
        <div class="select is-fullwidth">
          <select name="agency" id="agency">
           {#each agencyList as agency}
              {#if agency?._id}
                <option value={agency._id}>
                  {agency.AgencyName}
                </option>
              {:else}
                <option disabled>Invalid agency entry</option>
              {/if}
            {/each}
          </select>
        </div>
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
  