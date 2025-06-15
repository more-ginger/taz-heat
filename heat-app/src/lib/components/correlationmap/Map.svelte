<script lang="ts">
  import { geoMercator, geoPath } from "d3-geo";
  import { type ScaleSequential } from "d3-scale";
  import type { Feature, FeatureCollection, GeoJsonProperties } from "geojson";
  import Region from "./Region.svelte";
  import Tooltip from "./Tooltip.svelte";
  import { zoom, zoomIdentity } from "d3-zoom";
  import { select } from "d3-selection";
  import Pattern from "./Pattern.svelte";
  import ZoomMenu from "./ZoomMenu.svelte";
  import InfoWindow from "./InfoWindow.svelte";
  import type { Filter } from "$lib/types/types";

  interface Props {
    data: FeatureCollection;
    activePovertyLevel: Filter;
    activeTemperatureLevel: Filter;
    filterActive: boolean;
    heatScale: ScaleSequential<string, never>;
  }

  let { data, activePovertyLevel, activeTemperatureLevel, filterActive, heatScale }: Props =
    $props();

  let w = $state(0);
  let h = $state(0);

  let svgElement = $state() as Element;

  // Reactive switch case using $derived
  let scaleRatio = $derived(w <= 500 ? 29000 : w <= 660 ? 50000 : 57000);

  //PROJECTION
  let projection = $derived(
    geoMercator()
      .fitSize([w, h], data)
      .scale(scaleRatio) // manual scaling
      .center([13.4, 52.54])
      .translate([w / 2, h / 2])
  );

  //PATH GENERATOR PROJECTION
  let pathGenerator = $derived(geoPath().projection(projection));

  //zoom
  let zoomTransform = $state("");
  let zoomTooltip = $state("");
  const zoomMap = $derived(
    zoom()
      .translateExtent([
        [-200, -200],
        [w, h],
      ])
      .scaleExtent([1, 4])
      .on("zoom", ({ transform }) => {
        zoomTransform = transform.toString();
        //only use x and z pos for tooltip, scale = 1
        zoomTooltip = transform.scale(1.0);
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

  // InfoWindow for sources
  let isInfoWindowVisible = $state(false);

  function showInfoWindow() {
    isInfoWindowVisible = !isInfoWindowVisible;
  }

  function handleMapClick() {
    closeTooltip();
    console.log("Map clicked", isInfoWindowVisible);
    if (isInfoWindowVisible) {
      isInfoWindowVisible = false;
    }
  }
</script>

<div bind:clientHeight={h} bind:clientWidth={w} class="w-full relative h-dvh max-h-[624px]">
  <svg
    bind:this={svgElement}
    width={w}
    height={h}
    onclick={handleMapClick}
    tabindex="0"
    role="button"
    onkeydown={closeTooltip}
    class="relative"
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
        {zoomTooltip}
      ></Tooltip>
    {/if}
  </svg>
  <ZoomMenu {zoomIn} {zoomOut} {resetZoom}></ZoomMenu>
  <button
    class="absolute bottom-0 right-0 m-2.5 sm:m-5 size-8 bg-white hover:bg-gray-100 flex justify-center items-center border-1 rounded-sm cursor-pointer"
    onclick={showInfoWindow}
    >i
  </button>
  {#if isInfoWindowVisible}
    <InfoWindow onClose={showInfoWindow} />
  {/if}
</div>
