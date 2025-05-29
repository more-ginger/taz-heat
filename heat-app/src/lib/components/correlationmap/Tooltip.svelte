<script lang="ts">
  let { feature, centroid } = $props();

  let temperature = $derived(
    new Intl.NumberFormat("de-DE", {
      style: "unit",
      unit: "celsius",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(feature.properties.LST)
  );

  let percentage = $derived(
    new Intl.NumberFormat("de-DE", {
      style: "percent",
    }).format(feature.properties.sgb_quote / 100)
  );
</script>

<foreignObject x={centroid[0]} y={centroid[1]} width="200" height="100"
  ><div class="flex flex-col p-1 border bg-white">
    <h3>{feature.properties.Name}</h3>
    <p>Temperatur: {temperature}</p>
    <p>SGB-Anteil: {percentage}</p>
  </div>
</foreignObject>
