<script lang="ts">
  import type { Feature } from "geojson";

  interface Props {
    feature: Feature;
    centroid: number[];
  }
  let { feature, centroid }: Props = $props();

  $inspect(centroid);

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
</script>

<foreignObject 
  class="pointer-events-none" 
  x={centroid[0]-75} 
  y={centroid[1]-100} 
  width="150" 
  height="100"
  ><div class="tooltip flex flex-col p-1 mt-2 border bg-white">
    <h3 class="text-sm">{feature.properties!.Name}</h3>
    <p class="text-xs">Temperatur: {temperature}</p>
    <p class="text-xs">SGB-Anteil: {percentage}</p>
  </div>
</foreignObject>
