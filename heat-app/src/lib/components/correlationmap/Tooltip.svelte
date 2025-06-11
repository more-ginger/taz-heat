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
</script>

{#if isTooltipActive}
  <foreignObject
    class="pointer-events-none"
    x={xPosition - 80}
    y={centroid[1] - 90}
    width="160"
    height="100"
  >
    <div class="bg-white/90 text-center rounded-lg z-10 break-words flex flex-col p-1 mt-2 border">
      <h3 class="text-sm">{feature.properties!.Name}</h3>
      <p class="text-xs">Temperatur: {temperature}</p>
      <p class="text-xs">SGB-Anteil: {percentage}</p>
    </div>
  </foreignObject>
{/if}
