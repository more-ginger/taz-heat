<script lang="ts">
  let {
    feature,
    pathGenerator,
    heatScale,
    activePovertyLevel,
    activeTemperatureLevel,
    filterActive,
  } = $props();

  let regionHighlighted = $derived(
    !filterActive ||
      (filterActive &&
        feature.properties.lst_cat == activeTemperatureLevel &&
        feature.properties.sgb_cat == activePovertyLevel)
  );

  let opacity = $derived(regionHighlighted ? 1.0 : 0.1);
</script>

<path
  d={pathGenerator(feature)}
  id={feature.properties.Name}
  class="stroke-black stroke-[0.5]"
  fill={heatScale(feature.properties.LST)}
  {opacity}
>
</path>
{#if feature.properties.sgb_cat == "high"}
  <path d={pathGenerator(feature)} fill="url(#dots-large)" {opacity}></path>
{:else if feature.properties.sgb_cat == "medium"}
  <path d={pathGenerator(feature)} fill="url(#dots-medium)" {opacity}></path>
{:else if feature.properties.sgb_cat == "low"}
  <path d={pathGenerator(feature)} fill="url(#dots-small)" {opacity}> </path>
{/if}
