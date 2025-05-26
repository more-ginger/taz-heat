<script lang="ts">
  import { geoMercator, geoPath } from "d3-geo";
  import { type ScaleSequential } from "d3-scale";
  import Legend from "./Legend.svelte";
  import type { FeatureCollection } from "geojson";

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
</script>

<div bind:clientHeight={h} bind:clientWidth={w} class="w-full max-w-[1020px] h-fit max-h-[550px]">
  <svg width={w} height={h}>
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
        <path
          d={pathGenerator(feature)}
          class="stroke-black stroke-[0.5]"
          fill={heatScale(feature.properties.LST)}
          opacity={filterActive &&
          feature.properties.sgb_cat != activePovertyLevel &&
          feature.properties.lst_cat != activeTemperatureLevel
            ? 0.1
            : 1.0}
        >
        </path>
        {#if feature.properties.sgb_cat == "high"}
          <path
            d={pathGenerator(feature)}
            fill="url(#dots-large)"
            opacity={filterActive &&
            feature.properties.sgb_cat != activePovertyLevel &&
            feature.properties.lst_cat != activeTemperatureLevel
              ? 0.1
              : 1.0}
          ></path>
        {:else if feature.properties.sgb_cat == "medium"}
          <path
            d={pathGenerator(feature)}
            fill="url(#dots-medium)"
            opacity={filterActive &&
            feature.properties.sgb_cat != activePovertyLevel &&
            feature.properties.lst_cat != activeTemperatureLevel
              ? 0.1
              : 1.0}
          ></path>
        {:else if feature.properties.sgb_cat == "low"}
          <path
            d={pathGenerator(feature)}
            fill="url(#dots-small)"
            opacity={filterActive &&
            feature.properties.sgb_cat != activePovertyLevel &&
            feature.properties.lst_cat != activeTemperatureLevel
              ? 0.1
              : 1.0}
          ></path>
        {/if}
      {/if}
    {/each}
  </svg>
  <div class="text-end">Quelle: XYZ</div>
</div>
