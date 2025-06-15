<script lang="ts">
  import type { Feature } from "geojson";

  interface Props {
    feature: Feature;
    centroid: number[];
    isTooltipActive: boolean;
  }
  let { feature, centroid, isTooltipActive }: Props = $props();

  let temperature = $derived(
    new Intl.NumberFormat("de-DE", {
      style: "unit",
      unit: "celsius",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(feature.properties!.LST)
  );

  let percentage = $derived(
    new Intl.NumberFormat("de-DE", {
      style: "percent",
    }).format(feature.properties!.sgb_quote / 100)
  );

  // X positioning of tooltip to avoid cut-off edges
  const xPosition = $derived.by(() => {
    let xCentroid = centroid[0];
    if (centroid[0] < 80) {
      xCentroid += 80;
    } else if (centroid[0] >= 300) {
      xCentroid -= 80;
    }
    return xCentroid;
  });

  const x = $derived(xPosition - 80);
  const y = $derived(centroid[1] - 90);
</script>

{#if isTooltipActive}
  <div
    class="pointer-events-none absolute w-[160px] h-[100px] z-999"
    style:top="{y}px"
    style:left="{x}px"
  >
    <div class="bg-white/90 text-center rounded-lg break-words flex flex-col p-1 mt-2 border">
      <h3 class="text-sm">{feature.properties!.Name}</h3>
      <p class="text-xs">Temperatur: {temperature}</p>
      <p class="text-xs">SGB-Anteil: {percentage}</p>
    </div>
  </div>
{/if}
