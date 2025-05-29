<script lang="ts">
  let { feature } = $props();

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

<foreignObject x="0" y="0" width="300" height="160" class="bg-pink"
  ><div class="flex flex-col">
    <h3>{feature.properties.Name}</h3>
    <p>Temperatur: {temperature}</p>
    <p>SGB-Anteil: {percentage}</p>
  </div>
</foreignObject>
