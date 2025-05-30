<script lang="ts">
  import { geoMercator, geoPath } from "d3-geo";
  import { type ScaleSequential } from "d3-scale";
  import type { Feature, FeatureCollection } from "geojson";
  import Region from "./Region.svelte";
  import Tooltip from "./Tooltip.svelte";

  interface Props {
    data: FeatureCollection;
    activePovertyLevel: string;
    activeTemperatureLevel: string;
    filterActive: boolean;
    heatScale: ScaleSequential<string, never>;
  }

  let { data, activePovertyLevel, activeTemperatureLevel, filterActive, heatScale }: Props =
    $props();

  let w = $state(0);
  let h = $state(0);

  //PROJECTION
  let projection = $derived(
    geoMercator()
      .fitSize([w, h], data)
      .scale(50000) // manual scaling
      .center([13.4, 52.5])
      .translate([w / 2, h / 2])
  );

  //PATH GENERATOR PROJECTION
  let pathGenerator = $derived(geoPath().projection(projection));

  //tooltip
  let tooltipRegionID: null | number = $state(null);

  let tooltipRegion = $derived(
    data.features.find((d: Feature) => d.properties && d.properties.PLR_ID == tooltipRegionID)
  );

  let setTooltip = function (e: Event, id: number) {
    e.stopPropagation();
    tooltipRegionID = id;
  };

  let closeTooltip = function () {
    console.log("close");
    tooltipRegionID = null;
  };
</script>

<div bind:clientHeight={h} bind:clientWidth={w} class="w-full max-w-[1020px] h-fit max-h-[550px]">
  <svg
    width={w}
    height={h}
    onclick={closeTooltip}
    tabindex="0"
    role="button"
    aria-label="close tooltip"
    onkeydown={closeTooltip}
  >
    <defs>
      <pattern id="dots-large" patternUnits="userSpaceOnUse" width="4" height="4">
        <circle cx="2" cy="2" r="1.25" fill="currentColor" />
      </pattern>
      <pattern id="dots-medium" patternUnits="userSpaceOnUse" width="4" height="4">
        <circle cx="2" cy="2" r="0.75" fill="currentColor" />
      </pattern>
      <pattern id="dots-small" patternUnits="userSpaceOnUse" width="4" height="4">
        <circle cx="2" cy="2" r="0.25" fill="currentColor" />
      </pattern>
    </defs>
    {#each data.features as feature}
      {#if feature.properties}
        <Region
          regionHighlighted={!filterActive ||
            (filterActive &&
              feature.properties.lst_cat == activeTemperatureLevel &&
              feature.properties.sgb_cat == activePovertyLevel)}
          {feature}
          path={pathGenerator(feature)}
          {heatScale}
          {setTooltip}
          {closeTooltip}
        ></Region>
      {/if}
    {/each}
    {#if tooltipRegion}
      <Tooltip feature={tooltipRegion} centroid={pathGenerator.centroid(tooltipRegion)}></Tooltip>
    {/if}
  </svg>
  <div class="text-end">Quelle: XYZ</div>
</div>
