<script lang="ts">
    import { currentDataSets } from "$lib/runes.svelte";  
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import Card from "$lib/ui/Card.svelte";
    import type { PageProps } from "./$types";
    import { refreshRosterState } from "$lib/services/roster-utils";
    //Add chart liberies
    import { Chart as EChart } from 'svelte-echarts';
    import { convertToECharts } from '$lib/services/chart-utils'; 
    
    let { data }: PageProps = $props();
    refreshRosterState(data.rosters, data.agencies);
    const eChartOptions = convertToECharts(currentDataSets.rostersByProfession);
    console.log("EChart Options:", eChartOptions);
  </script>


<!-- First row: Frappe charts -->
<div class="columns">
  <div class="column">
    <Card title="Roster hours By profession (Frappe Bar)">
      <Chart data={currentDataSets.rostersByProfession} type="bar" />
    </Card>
  </div>

  <div class="column">
    <Card title="Roster hour By profession (Frappe Pie)">
      <Chart data={currentDataSets.rostersByProfession} type="pie" />
    </Card>
  </div>
</div>

<!-- Second row: ECharts line chart -->
<div class="columns">
  <div class="column is-full">
    <Card title="Roster Hours by Profession (ECharts Line)">
      <EChart options={eChartOptions} style="height: 400px;" />
    </Card>
  </div>
</div>


 








  
  
  