<script lang="ts">
  import FilterMenu from "$lib/components/correlationmap/FilterMenu.svelte";
  import Map from "$lib/components/correlationmap/Map.svelte";
  import type { FeatureCollection } from "geojson";
  import { scaleSequential } from "d3-scale";
  import { min, max } from "d3-array";
  import Legend from "$lib/components/correlationmap/Legend.svelte";
  import { piecewise, interpolateRgb } from "d3-interpolate";
  import type { Filter, UXTexting } from "$lib/types/types";
  import InfoWindow from "$lib/components/correlationmap/InfoWindow.svelte";

  //I needed to rewind the data here
  //https://observablehq.com/@saneef/fix-geojson
  interface Props {
    data: {
      geodata: FeatureCollection;
      temperatureParam: Filter;
      povertyParam: Filter;
      uxtexting: UXTexting;
    };
  }

  let { data }: Props = $props();

  let geodata = $derived(data.geodata);

  //FILTER MENU VALUES
  // here we can set the states according to the URL params
  let activePovertyLevel: Filter = $state(data.povertyParam);
  let activeTemperatureLevel: Filter = $state(data.temperatureParam);
  // Derived value to update filterActive
  let filterActive = $derived.by(() => {
    return !(activePovertyLevel === "all" && activeTemperatureLevel === "all");
  });

  //TITLE
  let dynamicTitle = $derived.by(() => {
    let title = data.uxtexting.headings.find(
      (d) => d.poverty == activePovertyLevel && d.temperature == activeTemperatureLevel
    );
    if (title) return title.title;
    else return undefined;
  });

  //SCALES
  // dynamic domain for heat scale
  let heatMin = $derived(Math.round(min(geodata.features.map((d) => d.properties?.LST))));
  let heatMax = $derived(Math.round(max(geodata.features.map((d) => d.properties?.LST))));
  // Redid interpolation to add the ivory color as mid-point
  let heatColors = piecewise(interpolateRgb, ["#005AF5", "#F9EFE3", "#FF0000"]);
  let heatScale = $derived(scaleSequential([heatMin, heatMax], heatColors));

  // income levels domain for legend
  let incomeLabels = $derived(geodata.features?.map((d) => d.properties?.lst_cat));
  let incomeDomain = $derived(incomeLabels.filter((l, i) => incomeLabels.indexOf(l) === i));
</script>

<div
  class="w-full max-w-[660px] h-[624px] m-auto flex flex-col sm:flex-row border-1 border-black mt-20"
>
  <div class="w-full h-full relative">
    <!-- to do: add logic for sentence when we get the text from taz -->
    <div
      class="absolute -top-0.5 -left-0.5 flex flex-col gap-2 z-10 sm:max-w-[450px] w-fit p-2.5 sm:p-5"
    >
      <h1 class="text-2xl bg-white/90 rounded-sm p-1 sm:p-2 size-fit">
        {#if dynamicTitle}
          {@html dynamicTitle}
        {:else}
          Gebiete in Berlin mit einer
          <span class="font-bold text-red-500">{activeTemperatureLevel} Temperatur</span> und einer
          <span class="font-bold">{activePovertyLevel} Armutsquote</span> in Berlin
        {/if}
      </h1>
      <FilterMenu bind:filterActive bind:activePovertyLevel bind:activeTemperatureLevel
      ></FilterMenu>
    </div>

    <Map data={geodata} {activePovertyLevel} {activeTemperatureLevel} {filterActive} {heatScale}
    ></Map>
    <InfoWindow />
    <div class="absolute bottom-0 p-2.5 sm:p-5 z-10">
      <Legend heatDomain={[heatMin, heatMax]} {heatScale} {incomeDomain}></Legend>
    </div>
  </div>
</div>
