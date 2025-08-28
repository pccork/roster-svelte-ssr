<script lang="ts">
    import { currentDataSets } from "$lib/runes.svelte";  
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import { BarChart, PieChart } from 'layerchart';
    import { convertToDotPlot } from '$lib/services/chart-utils';
    import Card from "$lib/ui/Card.svelte";
    import type { PageProps } from "./$types";
    import { refreshRosterState } from "$lib/services/roster-utils";
    //Add chart liberies
    //import { Chart as EChart } from 'svelte-echarts';
    //import { convertToECharts } from '$lib/services/chart-utils'; 
    
    let { data }: PageProps = $props();
    refreshRosterState(data.rosters, data.agencies);
    const lineStyleChartData = convertToDotPlot(currentDataSets.rostersByProfession);
    const maxValue = Math.max(...lineStyleChartData.map(d => d.value));
 
    console.log("LayerChart Data:", lineStyleChartData);
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

<div class="columns">
  <div class="column">
    <Card title="Roster Distribution by Profession (Table with Bars)">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 4px;">Profession</th>
            <th style="text-align: left; padding: 4px;">Hours</th>
            <th style="text-align: left; padding: 16px;">Visual</th>
          </tr>
        </thead>
        <tbody>
          {#each lineStyleChartData as item}
            <tr>
              <td style="padding: 4px;">{item.label}</td>
              <td style="padding: 4px;">{item.value}</td>
              <td style="padding: 16px;">
                <div
                  style="
                    height: 12px;
                    background-color: #333;
                    width: {(item.value / maxValue) * 100}%;
                    border-radius: 4px;
                    transition: width 0.3s ease;
                  "
                ></div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </Card>
  </div>
</div>



 








  
  
  