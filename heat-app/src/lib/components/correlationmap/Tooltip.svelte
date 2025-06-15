<script lang="ts">
  import type { Feature } from "geojson";

  interface Props {
    feature: Feature;
    centroid: number[];
    isTooltipActive: boolean;
    zoomTooltip: { x: number; y: number; k: number };
    w: number;
  }
  let { feature, centroid, isTooltipActive, zoomTooltip, w }: Props = $props();

  let offsetY = $derived(-90);
  const leftEdge = $derived(90);
  const rightEdge = $derived(w - 160);

  let centroidTransformed = {
    x: centroid[0] * zoomTooltip.k + zoomTooltip.x,
    y: centroid[1] * zoomTooltip.k + zoomTooltip.y,
  };

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
    let xCentroid = centroidTransformed.x;
    if (centroidTransformed.x < leftEdge) {
      xCentroid += 0;
    } else if (centroidTransformed.x >= rightEdge) {
      xCentroid -= 160;
    }
    return xCentroid;
  });

  const x = $derived(xPosition);
  const y = $derived(centroidTransformed.y + offsetY);
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
