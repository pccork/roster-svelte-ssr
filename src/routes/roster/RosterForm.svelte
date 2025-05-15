<script lang="ts">
    import { currentAgencies,loggedInUser } from "$lib/runes.svelte";
    import { rosterService } from "$lib/services/roster-service";
    import type { Roster } from "$lib/types/roster-types";
    import Coordinates from "$lib/ui/Coordinates.svelte";


  
    let hour = $state(0);
    let lat = $state(52.160858);
    let lng = $state(-7.15242);
    let selectedAgency = $state("DOC-T-1, Clinistaffs");
    let staffProfession = ["doctor", "nurse"];
    let selectedProfession = $state("doctor");
    let message = $state("Please enter hours of roster");
    let { rosterEvent = null } = $props();
    
    async function roster() {
    if (selectedAgency && hour && selectedProfession) {
      const agency = currentAgencies.agencies.find(
        (agency) => agency._id === selectedAgency
      );
      if (agency) {
        const roster: Roster = {
          hour: hour,
          profession: selectedProfession,
          agency: selectedAgency,
          lat: lat,
          lng: lng,
          staff: loggedInUser._id
        };
        const success = await rosterService.roster(roster, loggedInUser.token);
        if (!success) {
          message = "Roster entry not completed - some error occurred";
          return;
        }
        if (rosterEvent) rosterEvent(roster);
        message = `Thanks! You completed ${hour} hours with ${agency.code} ${agency.agencyName}`;
      }
    } else {
      message = "Please select hour, profession and agency";
    }
  }

    
  </script>
  
  <div>
    <div class="field">
      <label class="label" for="hour">Enter Hour:</label>
      <input bind:value={hour} class="input" id="hour" name="hour" type="number" />
    </div>
    <div class="field">
      <div class="control">
        <label class="label" for="hour">Select Profession:</label>
        {#each staffProfession as profession}
          <input bind:group={selectedProfession} class="radio" type="radio" value={profession} /> {profession}
        {/each}
      </div>
    </div>
    <div class="field">
      <label class="label" for="hour">Select Agent:</label>
      <div class="select">
        <select bind:value={selectedAgency}>
          {#each currentAgencies.agencies as agency}
          <option value={agency._id}>{agency.code},{agency.agencyName}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button onclick={() => roster()} class="button">Roster</button>
      </div>
    </div>
  </div>
  <Coordinates bind:lat bind:lng />
  <div class="box mt-4">
    <div class="content has-text-centered">
      {message}
    </div>
  </div>
  
  