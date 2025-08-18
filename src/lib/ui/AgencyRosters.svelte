<script lang="ts">
  let { rosters } = $props();
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>hour</th>
      <th>Profession</th>
      <th>Staff</th>
    </tr>
  </thead>
  <tbody>
    {#each rosters as roster}
      <tr>
        <td>
          {roster.hour}
        </td>
        <td>
          {roster.profession}
        </td>
        <td>
          {#if typeof roster.staff !== "string"}
            {roster.staff.lastName}, {roster.staff.firstName}
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
