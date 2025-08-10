// lib/services/chart-utils.ts
import type { DataSet } from "$lib/types/roster-types";
import type { EChartsOption } from "echarts";

export function convertToECharts(dataSet: DataSet): EChartsOption {
  return {
    tooltip: {},
    xAxis: {
      type: "category",
      data: dataSet.labels
    },
    yAxis: {
      type: "value"
    },
    series: dataSet.datasets.map((ds, i) => ({
      name: `Series ${i + 1}`,
      type: "bar",
      data: ds.values
    }))
  };
}
