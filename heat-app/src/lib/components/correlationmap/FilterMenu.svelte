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
  <option value="low">Niedrig</option>
  <option value="medium">Mittel</option>
  <option value="high">Hoch</option>
{/snippet}

<div class="flex flex-col text-sm gap-2.5 size-fit">
  <Dropdown
    {options}
    value={activeTemperatureLevel}
    name="temperature"
    label="Oberflächentemperatur:"
  ></Dropdown>
  <Dropdown {options} value={activePovertyLevel} name="poverty" label="Armutsquote:"></Dropdown>
</div>
