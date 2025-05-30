<script lang="ts">
  import FilterMenu from "$lib/components/correlationmap/FilterMenu.svelte";
  import Map from "$lib/components/correlationmap/Map.svelte";
  import type { FeatureCollection } from "geojson";
  import { scaleSequential } from "d3-scale";
  import {min, max} from "d3-array";
  import Legend from "$lib/components/correlationmap/Legend.svelte";
  import { piecewise, interpolateRgb } from "d3-interpolate";

  //I needed to rewind the data here
  //https://observablehq.com/@saneef/fix-geojson
  interface Props {
    data: FeatureCollection;
  }

  let { data }: Props = $props();

  //filter menu values
  let filterActive = $state(false);
  let activePovertyLevel = $state("low");
  let activeTemperatureLevel = $state("low");

  //SCALES
  // dynamic domain for heat scale
  let heatMin = $derived(Math.round(min(data.features.map((d) => d.properties?.LST))));
  let heatMax = $derived(Math.round(max(data.features.map((d) => d.properties?.LST))));
  // Redid interpolation to add the ivory color as mid-point
  let heatColors = piecewise(interpolateRgb, ["#005AF5", "#F9EFE3", "#FF0000"]);
  let heatScale = $derived(scaleSequential([heatMin, heatMax], heatColors));


  // income levels domain for legend
  let incomeLabels =  $derived(data.features?.map((d) => d.properties?.lst_cat))
  let incomeDomain = $derived(incomeLabels.filter((l, i) => incomeLabels.indexOf(l) === i))
</script>

<div
  class="w-full max-w-[1020px] md:max-h-[689px] m-auto flex flex-col md:flex-row p-5 border-1 border-black mt-20"
>
  <div class="md:w-2/6 flex flex-col mr-8 md:gap-5 bg-yellow-100">
    <h1 class="text-2xl md:w-68">
      Correlation between average 
      <span class="font-bold text-red-500">temperature</span> and
      <span class="font-bold">poverty</span> in Berlin
    </h1>
    <FilterMenu 
      bind:filterActive 
      bind:activePovertyLevel 
      bind:activeTemperatureLevel
    >
    </FilterMenu>
    <Legend 
      heatDomain={[heatMin, heatMax]} 
      {heatScale}
      {incomeDomain}
    >
    </Legend>
  </div>
  <div class="md:w-4/6">
    <Map 
      {data} 
      {activePovertyLevel} 
      {activeTemperatureLevel} 
      {filterActive} 
      {heatScale}
    >
    </Map>
  </div>
</div>
