<script lang="ts">
  import Dropdown from "../uiElements/Dropdown.svelte";
  import type { Filter } from "$lib/types/types";

  interface Props {
    filterActive: boolean;
    activePovertyLevel: Filter;
    activeTemperatureLevel: Filter;
  }

  //bindable filter menu values
  let {
    filterActive = $bindable(false),
    activePovertyLevel = $bindable("low"),
    activeTemperatureLevel = $bindable("low"),
  }: Props = $props();
</script>

{#snippet options()}
  <option value="all">Alle anzeigen</option>
  <option value="low">niedrig</option>
  <option value="medium">mittel</option>
  <option value="high">hoch</option>
{/snippet}

<div class="flex flex-col text-sm gap-2.5 size-fit">
  <Dropdown
    {options}
    bind:value={activeTemperatureLevel}
    name="temperature"
    label="Oberflächentemperatur:"
  ></Dropdown>
  <Dropdown {options} bind:value={activePovertyLevel} name="poverty" label="Armutsquote:"
  ></Dropdown>
</div>
