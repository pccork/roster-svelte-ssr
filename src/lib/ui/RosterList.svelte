<script lang="ts">
   import { currentRosters } from "$lib/runes.svelte";
</script>
    
  
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Hour</th>
        <th>Profession</th>
        <th>Agency</th>
        <th>Staff</th>
      </tr>
    </thead>
    <tbody>
      {#each currentRosters.rosters as roster}
        <tr>
          <td>
            {roster.hour}
          </td>
          <td>
            
            {roster.profession}
          </td>
          <td>
            {#if typeof roster.agency !== "string"}
               <a href={`/agency/${roster.agency._id}`}>{roster.agency.code}, {roster.agency.AgencyName}</a>
             {/if}
          </td>
          <td>
            {#if typeof roster.agency !== "string"}
               {roster.staff.lastName}, {roster.staff.firstName}
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  