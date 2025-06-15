<script lang="ts">
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

<div class="flex flex-col text-sm gap-2.5">
  <div class="bg-white rounded-sm p-1 border-1 size-fit">
    <label for="temperature cursor-pointer">Oberflächtentemperatur:</label>
    <select class="underline" name="temperature" bind:value={activeTemperatureLevel}>
      {@render options()}
    </select>
  </div>
  <div class="bg-white rounded-sm p-1 border-1 size-fit">
    <label for="poverty">Armutsquote</label>
    <select class="underline cursor-pointer" name="poverty" bind:value={activePovertyLevel}>
      {@render options()}
    </select>
  </div>
</div>
