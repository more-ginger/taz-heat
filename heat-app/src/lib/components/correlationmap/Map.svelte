<script lang="ts">
  import { geoMercator, geoPath } from 'd3-geo'
  import { interpolateRgbBasis } from 'd3-interpolate'
  import { scaleSequential } from 'd3-scale'
  import Legend from './Legend.svelte'
  import type { FeatureCollection } from 'geojson'
  interface Props {
    data: FeatureCollection
    activePovertyLevel: string
    filterActive: boolean
  }

  let { data, activePovertyLevel, filterActive }: Props = $props()

  let w = $state(0)
  let h = $state(0)

  //PROJECTION
  let projection = $derived(
    geoMercator()
      .fitSize([w, h], data)
      .scale(40000) // manual scaling
      .center([13.4, 52.5])
      .translate([w / 2, h / 2])
  )

  //PATH GENERATOR PROJECTION
  let pathGenerator = $derived(geoPath().projection(projection))

  //SCALES
  let heatDomain = [28, 39]
  let heatColors = interpolateRgbBasis(['#007AF5', '#F9EFE3', '#F40000'])
  let heatScale = $derived(scaleSequential(heatDomain, heatColors))
</script>

<div bind:clientHeight={h} bind:clientWidth={w} class="w-full h-full">
  <svg width={w} height={h}>
    <defs>
      <pattern
        id="dots-large"
        patternUnits="userSpaceOnUse"
        width="4"
        height="4">
        <circle cx="2" cy="2" r="1" fill="black" />
      </pattern>
      <pattern
        id="dots-small"
        patternUnits="userSpaceOnUse"
        width="4"
        height="4">
        <circle cx="2" cy="2" r="0.5" fill="black" />
      </pattern>
    </defs>
    {#each data.features as feature}
      {#if feature.properties}
        <path
          d={pathGenerator(feature)}
          class="stroke-black stroke-[0.5]"
          fill={heatScale(feature.properties.LST)}
          opacity={filterActive &&
          feature.properties.sgb_cat != activePovertyLevel
            ? 0.1
            : 1.0}>
        </path>
        {#if feature.properties.sgb_cat == 'high'}
          <path d={pathGenerator(feature)} fill="url(#dots-large)"></path>
        {:else if feature.properties.sgb_cat == 'medium'}
          <path d={pathGenerator(feature)} fill="url(#dots-small)"></path>
        {/if}
      {/if}
    {/each}
  </svg>
  <Legend {heatDomain} {heatScale}></Legend>
</div>
