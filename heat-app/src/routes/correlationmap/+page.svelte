<script lang="ts">
  import FilterMenu from "$lib/components/correlationmap/FilterMenu.svelte";
  import Map from "$lib/components/correlationmap/Map.svelte";
  import type { FeatureCollection } from "geojson";
  import { scaleSequential } from "d3-scale";
  import { min, max } from "d3-array";
  import Legend from "$lib/components/correlationmap/Legend.svelte";
  import { piecewise, interpolateRgb } from "d3-interpolate";

  //I needed to rewind the data here
  //https://observablehq.com/@saneef/fix-geojson
  interface Props {
    data: FeatureCollection;
  }

  let { data }: Props = $props();

  //filter menu values
  // here we can set the states according to the URL params
  let filterActive = $state(false);
  let activePovertyLevel = $state("all");
  let activeTemperatureLevel = $state("all");

  //SCALES
  // dynamic domain for heat scale
  let heatMin = $derived(Math.round(min(data.features.map((d) => d.properties?.LST))));
  let heatMax = $derived(Math.round(max(data.features.map((d) => d.properties?.LST))));
  // Redid interpolation to add the ivory color as mid-point
  let heatColors = piecewise(interpolateRgb, ["#005AF5", "#F9EFE3", "#FF0000"]);
  let heatScale = $derived(scaleSequential([heatMin, heatMax], heatColors));

  // income levels domain for legend
  let incomeLabels = $derived(data.features?.map((d) => d.properties?.lst_cat));
  let incomeDomain = $derived(incomeLabels.filter((l, i) => incomeLabels.indexOf(l) === i));
</script>

<div
  class="w-full max-w-[1020px] md:max-h-[689px] m-auto flex flex-col md:flex-row p-5 border-1 border-black mt-20"
>
  <!-- to do: add logic for sentence when we get the text from taz -->
  <div class="md:w-2/7 flex flex-col md:mr-5 md:gap-5 justify-between">
    <h1 class="text-2xl md:w-68">
      Gebiete in Berlin mit
      <span class="font-bold text-red-500">{activeTemperatureLevel} Temperatur</span> und
      <span class="font-bold">{activePovertyLevel} Armutsquote</span> in Berlin
    </h1>
    <div>
      <FilterMenu bind:filterActive bind:activePovertyLevel bind:activeTemperatureLevel
      ></FilterMenu>
      <Legend heatDomain={[heatMin, heatMax]} {heatScale} {incomeDomain}></Legend>

      <div class="quelle mt-10">
        Quelle: A very long string of text with some name because I need to check the behaviour
      </div>
    </div>
  </div>
  <div class="md:w-5/7">
    <Map {data} {activePovertyLevel} {activeTemperatureLevel} {filterActive} {heatScale}></Map>
  </div>
</div>
