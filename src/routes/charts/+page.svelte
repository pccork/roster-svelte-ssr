<script lang="ts">
    import { currentDataSets } from "$lib/runes.svelte";
   
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import Card from "$lib/ui/Card.svelte";
  
    
  </script>

<div class="columns">
    <div class="column">
      <Card title="Roster hours By profession">
        <Chart data={currentDataSets.rostersByProfession} type="bar" />
      </Card>
    </div>
    <div class="column has-text-centered">
      <Card title="Roster hour By Profession">
        <Chart data={currentDataSets.rostersByProfession} type="pie" />
      </Card>
    </div>
  </div>








  
  
  