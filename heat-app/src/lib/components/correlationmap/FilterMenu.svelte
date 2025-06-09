<script lang="ts">
  interface Props {
    filterActive: boolean;
    activePovertyLevel: string;
    activeTemperatureLevel: string;
  }

  //bindable filter menu values
  let {
    filterActive = $bindable(false),
    activePovertyLevel = $bindable("low"),
    activeTemperatureLevel = $bindable("low"),
  }: Props = $props();

  // Derived value to update filterActive
  let filterActiveDerived = $derived.by(() => {
    return !(activePovertyLevel === "all" && activeTemperatureLevel === "all");
  });

  // Update filterActive whenever filterActiveDerived changes
  $effect(() => {
    filterActive = filterActiveDerived;
  });
</script>

<div class="flex flex-col py-2">
  <h1 class="font-semibold">Filter</h1>
  <div class="flex flex-col p-2 border border-gray-200 text-sm rounded-sm">
    <div>
      <label for="poverty">Armutsquote</label>
      <select class="underline" name="poverty" bind:value={activePovertyLevel}>
        <option value="all">alle anzeigen</option>
        <option value="low">niedrig</option>
        <option value="medium">mittel</option>
        <option value="high">hoch</option>
      </select>
    </div>
    <div>
      <label for="temperature">Temperatur:</label>
      <select class="underline" name="temperature" bind:value={activeTemperatureLevel}>
        <option value="all">alle anzeigen</option>
        <option value="low">niedrig</option>
        <option value="medium">mittel</option>
        <option value="high">hoch</option>
      </select>
    </div>
  </div>
</div>
