<script lang="ts">
  import { range } from 'd3-array'
  interface Props {
    heatDomain: number[]
    heatScale: (temp: number) => string
  }

  let { heatDomain, heatScale }: Props = $props()
</script>

<div class="flex flex-col gap-s">
  How to read the map
  {#each range(heatDomain[0], heatDomain[1], 1) as temp}
    <div class="flex flex-row items-center p-2 gap-2">
      <div class="w-10 h-3 border" style="background:{heatScale(temp)}"></div>
      <div>{temp}°C</div>
    </div>
  {/each}
</div>
