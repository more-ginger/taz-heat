<script lang="ts">
  import { range } from "d3-array";
  interface Props {
    heatDomain: number[];
    heatScale: (temp: number) => string;
  }

  let { heatDomain, heatScale }: Props = $props();
</script>

<div class="flex flex-col gap-0.5">
  How to read the map
  {#each range(heatDomain[0], heatDomain[1], 1) as temp}
    <div class="flex flex-row items-center pl-1 gap-1">
      <div class="w-14 h-6 border" style="background:{heatScale(temp)}"></div>
      <div class={`${temp === 38 || temp === 35 || temp === 28 ? "block" : "hidden"}`}>
        {temp}°C
      </div>
    </div>
  {/each}
</div>
