<script lang="ts">
  import { range } from "d3-array";
  import Pattern from "./Pattern.svelte";
  import { slide } from "svelte/transition";

  interface Props {
    heatDomain: number[];
    heatScale: (temp: number) => string;
    incomeDomain: string[];
  }

  let { heatDomain, heatScale, incomeDomain }: Props = $props();
  let isExpanded = $state(true);
</script>

<div class="flex flex-col bg-white/90 rounded-sm p-2">
  <button
    class={`flex items-center justify-between w-full cursor-pointer text-left text-sm ${
      isExpanded ? "mb-2" : "hover:underline"
    }`}
    onclick={() => (isExpanded = !isExpanded)}
  >
    Legende
    {#if isExpanded}<div class="w-4 h-4 flex items-center justify-center">
        <svg
          class="w-full h-full transition-all duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path class="transition-opacity duration-200" d="M18 6L6 18M6 6l12 12" />
        </svg>
      </div>
    {/if}
  </button>

  {#if isExpanded}
    <div transition:slide={{ duration: 200 }}>
      <div>
        <div>
          <h5 class="my-2">Mittägliche Oberflächentemperatur <br />im Sommer:</h5>
        </div>
        <div>
          <div class="flex w-full">
            {#each range(heatDomain[0], heatDomain[1], 1) as temp}
              <div class="w-full">
                <div
                  class="w-full h-4 border border-white"
                  style="background:{heatScale(temp)}"
                ></div>
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
          <h5 class="my-2">Quote der Empfänger*innen <br /> von Transferleistungen:</h5>
        </div>
        <div class="flex gap-2.5">
          {#each incomeDomain as level}
            <div class="flex gap-1">
              <svg class="w-5 h-5">
                <Pattern />
                <circle cx="50%" cy="50%" r="9" fill={`url(#dots-${level})`} stroke="black">
                </circle>
              </svg>
              <h5>{level}</h5>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
