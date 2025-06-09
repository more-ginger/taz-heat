<script lang="ts">
  import { range } from "d3-array";
  import Pattern from "./Pattern.svelte";

  interface Props {
    heatDomain: number[];
    heatScale: (temp: number) => string;
    incomeDomain: string[];
  }

  let { heatDomain, heatScale, incomeDomain }: Props = $props();
</script>

<div class="flex flex-col">
  <div>
    <div>
      <h5 class="my-2">Durschnittliche Oberflächentemperatur:</h5>
    </div>
    <div>
      <div class="flex w-full">
        {#each range(heatDomain[0], heatDomain[1], 1) as temp}
          <div class="w-full">
            <div class="w-full h-4 border border-white" style="background:{heatScale(temp)}"></div>
            <h5 class={`${temp === 39 || temp === 28 ? "block" : "hidden"}`}>
              {temp}°C
            </h5>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div>
    <div>
      <h5 class="my-2">Quote der Sozialgeldempfänger:innen:</h5>
    </div>
    <div class="flex gap-2.5">
      {#each incomeDomain as level}
        <div class="flex gap-1">
          <svg class="w-5 h-5">
            <Pattern />
            <circle cx="50%" cy="50%" r="10" fill={`url(#dots-${level})`} stroke="black"> </circle>
          </svg>
          <h5>{level}</h5>
        </div>
      {/each}
    </div>
  </div>
</div>
