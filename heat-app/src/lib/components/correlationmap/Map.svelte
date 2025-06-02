<script lang="ts">
  import { geoMercator, geoPath } from "d3-geo";
  import { type ScaleSequential } from "d3-scale";
  import type { Feature, FeatureCollection } from "geojson";
  import Region from "./Region.svelte";
  import Tooltip from "./Tooltip.svelte";
  import { zoom } from "d3-zoom";
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

  let svgElement = $state() as SVGElement;
  let svgGroupElement = $state() as SVGGElement;

  let scaleRatio = $derived(w <= 400 ? 31000 : 52000);

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

  const zoomMap = zoom().on("zoom", (event: any) => {
    const { x, y, k } = event.transform;
    zoomTransform = `translate(${x},${y}) scale(${k})`;
  });

  $effect(() => {
    zoomMap(svgElement as any);
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
    console.log("close");
    tooltipRegionID = null;
  };
</script>

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
    </g>
    {#if tooltipRegion}
      <Tooltip feature={tooltipRegion} centroid={pathGenerator.centroid(tooltipRegion)}></Tooltip>
    {/if}
  </svg>
  <div class="quelle text-end absolute w-68 bottom-0 right-0">
    Quelle: A very long string of text with some name because I need to check the behaviour
  </div>
</div>
