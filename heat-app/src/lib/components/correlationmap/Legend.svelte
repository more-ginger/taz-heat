<script lang="ts">
  import { range } from "d3-array";
  import Pattern from "./Pattern.svelte";

  interface Props {
    heatDomain: number[];
    heatScale: (temp: number) => string;
    incomeDomain: string[];
  }

  let { heatDomain, heatScale, incomeDomain }: Props = $props();
  let povertyLevels = ["Niedrig", "Mittel", "Hoch"];
</script>

<div class="md:flex bg-red-100">
  <div class="bg-green-100">
    <div>
      <h5 class="m-2">
        Durschnittliche Oberflächentemperatur:
      </h5>
    </div>
    <div>
      <div class="flex w-full md:gap-0.5 md:flex-col">
        {#each range(heatDomain[0], heatDomain[1], 1) as temp}
          <div class="w-full flex flex-row items-center md:pl-1 gap-1">
            <div class="w-full h-4 border border-white md:w-8" style="background:{heatScale(temp)}"></div>
            <h5 class={`${temp === 39 || temp === 28 ? "block" : "hidden"}`}>
              {temp}°C
            </h5>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="bg-purple-100">
    <div>
      <h5 class="m-2">Quote der Sozialgeldempfänger:innen:</h5>
    </div>
    <div>
      {#each incomeDomain as level}
      <div class="flex">
        <svg class="w-10 h-10">
          <Pattern/>
          <circle 
            cx="50%" 
            cy="50%" 
            r=10 
            fill={`url(#dots-${level})`} 
            stroke="black"
          >
          </circle> 
        </svg>
        <h5>{level}</h5>
      </div>
      {/each}
    </div>
  </div>
</div>


