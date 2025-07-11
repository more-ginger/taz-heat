<script lang="ts">
  import type { Feature } from "geojson";
  import type { ScaleSequential } from "d3-scale";

  interface Props {
    feature: Feature;
    path: string | null;
    heatScale: ScaleSequential<string, never>;
    regionHighlighted: boolean;
    setTooltip: (e: Event, id: number) => void;
    closeTooltip: () => void;
    tooltipRegionName: string;
    isDesktop: boolean;
  }

  let {
    feature,
    path,
    heatScale,
    regionHighlighted,
    setTooltip,
    closeTooltip,
    tooltipRegionName,
    isDesktop,
  }: Props = $props();

  let opacity = $derived(regionHighlighted ? 1.0 : 0.1);

  const handleClick = function (e: Event, id: number) {
    if (!isDesktop) {
      setTooltip(e, id);
    }
  };
</script>

{#if feature.properties}
  <g
    onclick={(e) => handleClick(e, feature.properties!.PLR_ID)}
    onmouseenter={(e) => setTooltip(e, feature.properties!.PLR_ID)}
    onmouseleave={closeTooltip}
    tabindex="0"
    role="button"
    aria-label="tooltip"
    onkeydown={(e) => setTooltip(e, feature.properties!.PLR_ID)}
    class="focus:outline-none"
  >
    <path
      d={path}
      id={feature.properties.Name}
      class="
        stroke-black
        stroke-[0.5]
        {tooltipRegionName == feature.properties.Name && regionHighlighted ? 'stroke-[2]' : ''}"
      fill={heatScale(feature.properties.LST)}
      {opacity}
    >
    </path>
    {#if feature.properties.sgb_cat == "high"}
      <path d={path} fill="url(#dots-high)" {opacity}></path>
    {:else if feature.properties.sgb_cat == "medium"}
      <path d={path} fill="url(#dots-medium)" {opacity}></path>
    {:else if feature.properties.sgb_cat == "low"}
      <path d={path} fill="url(#dots-low)" {opacity}> </path>
    {/if}
  </g>
{/if}
