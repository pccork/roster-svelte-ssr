// lib/services/chart-utils.ts
import type { DataSet } from "$lib/types/roster-types";
//import type { EChartsOption } from "echarts";


export function convertToDotPlot(data: DataSet): {
  label: string;
  value: number;
}[] {
  return data.labels.map((label, i) => ({
    label,
    value: data.datasets[0].values[i]
  }));
}





/*
export function convertToLayerChart(data: DataSet): { label: string; value: number;color: string }[] {
  return data.labels.map((label, i) => ({
    label,
    value: data.datasets[0].values[i],
    color: defaultColors[i % defaultColors.length] 
  }));
}
  */