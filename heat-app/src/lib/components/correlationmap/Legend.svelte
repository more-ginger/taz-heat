<script lang="ts">
  import { range } from "d3-array";
  interface Props {
    heatDomain: number[];
    heatScale: (temp: number) => string;
  }

  let { heatDomain, heatScale }: Props = $props();
</script>

<div>
  <div><h5>Durschnittliche Oberflächentemperatur:</h5></div>
  <div>
    <div class="flex w-full md:gap-0.5 md:flex-col">
      {#each range(heatDomain[0], heatDomain[1], 1) as temp}
        <div class="w-full flex flex-row items-center md:pl-1 gap-1">
          <div class="w-full h-6 border border-white md:w-14" style="background:{heatScale(temp)}"></div>
          <h5 class={`${temp === 39 || temp === 28 ? "block" : "hidden"}`}>
            {temp}°C
          </h5>
        </div>
      {/each}
    </div>
  </div>
</div>


