<script lang="ts">
  import FilterMenu from '$lib/components/correlationmap/FilterMenu.svelte'
  import Map from '$lib/components/correlationmap/Map.svelte'
  import type { FeatureCollection } from 'geojson'

  //I needed to rewind the data here
  //https://observablehq.com/@saneef/fix-geojson
  interface Props {
    data: FeatureCollection
  }

  let { data }: Props = $props()

  //filter menu values
  let filterActive = $state(false)
  let activePovertyLevel = $state('low')
</script>

<FilterMenu bind:filterActive bind:activePovertyLevel></FilterMenu>
<div class="w-screen h-[400px]">
  Correlation Map
  <Map {data} {activePovertyLevel} {filterActive}></Map>
</div>
