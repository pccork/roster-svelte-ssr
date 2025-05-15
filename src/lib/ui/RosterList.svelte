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
          </td><td>
            {roster.agency.code}, {roster.agency.agencyName}
          </td>
          <td>
            {roster.staff.lastName}, {roster.staff.firstName}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  