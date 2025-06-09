<script lang="ts">
  import { geoMercator, geoPath } from "d3-geo";
  import { type ScaleSequential } from "d3-scale";
  import type { Feature, FeatureCollection, GeoJsonProperties } from "geojson";
  import Region from "./Region.svelte";
  import Tooltip from "./Tooltip.svelte";
  import { zoom, zoomIdentity } from "d3-zoom";
  import { select } from "d3-selection";
  import Pattern from "./Pattern.svelte";

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

  let svgElement = $state() as Element;

  // Reactive switch case using $derived
  let scaleRatio = $derived(w <= 500 ? 29000 : w <= 620 ? 45000 : 57000);

  //PROJECTION
  let projection = $derived(
    geoMercator()
      .fitSize([w, h], data)
      .scale(scaleRatio) // manual scaling
      .center([13.42, 52.5])
      .translate([w / 2, h / 2])
  );

  //PATH GENERATOR PROJECTION
  let pathGenerator = $derived(geoPath().projection(projection));

  //zoom
  let zoomTransform = $state("");

  const zoomMap = $derived(
    zoom()
      .translateExtent([
        [-200, -200],
        [w, h],
      ])
      .scaleExtent([1, 4])
      .on("zoom", ({ transform }) => {
        zoomTransform = transform;
      })
  );

  function zoomIn() {
    select(svgElement).transition().call(zoomMap.scaleBy, 1.2);
  }

  function zoomOut() {
    select(svgElement)
      .transition()
      .call(zoomMap.scaleBy, 1 / 1.2);
  }

  function resetZoom() {
    select(svgElement).transition().call(zoomMap.transform, zoomIdentity);
  }

  $effect(() => {
    //call zoom functionality on mount
    if (svgElement) {
      select(svgElement).call(zoomMap);
    }
  });

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
    tooltipRegionID = null;
  };

  // Function to determine if a region should be highlighted
  function isRegionHighlighted(properties: GeoJsonProperties) {
    return (
      !filterActive ||
      (filterActive &&
        (activeTemperatureLevel === "all" || properties?.lst_cat === activeTemperatureLevel) &&
        (activePovertyLevel === "all" || properties?.sgb_cat === activePovertyLevel))
    );
  }
</script>

<div class="flex flex-row gap-2 justify-end">
  <button onclick={zoomOut}>-</button>
  <button onclick={zoomIn}>+</button>
  <button onclick={resetZoom}>Reset Zoom</button>
</div>
<div
  bind:clientHeight={h}
  bind:clientWidth={w}
  class="w-full relative h-dvh max-h-[400px] md:max-h-[600px]"
>
  <svg
    bind:this={svgElement}
    width={w}
    height={h}
    onclick={closeTooltip}
    tabindex="0"
    role="button"
    aria-label="close tooltip"
    onkeydown={closeTooltip}
  >
    <Pattern />
    <g transform={zoomTransform}>
      {#each data.features as feature}
        {#if feature.properties}
          <Region
            regionHighlighted={isRegionHighlighted(feature.properties)}
            {feature}
            path={pathGenerator(feature)}
            {heatScale}
            {setTooltip}
            {closeTooltip}
            tooltipRegionName={tooltipRegion?.properties?.Name}
          ></Region>
        {/if}
      {/each}
    </g>
    {#if tooltipRegion}
      <Tooltip
        feature={tooltipRegion}
        centroid={pathGenerator.centroid(tooltipRegion)}
        isTooltipActive={isRegionHighlighted(tooltipRegion.properties)}
      ></Tooltip>
    {/if}
  </svg>
</div>
