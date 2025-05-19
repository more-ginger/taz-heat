<script lang="ts">
  import Map from '$lib/components/correlationmap/Map.svelte'
  import type { FeatureCollection } from 'geojson'

  //I needed to rewind the data here
  //https://observablehq.com/@saneef/fix-geojson
  interface Props {
    data: FeatureCollection
  }

  let { data }: Props = $props()
</script>

<div class="w-screen h-[400px]">
  Correlation Map

  <Map {data}></Map>
</div>
