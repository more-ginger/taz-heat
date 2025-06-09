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

<div class="flex flex-col text-sm gap-2.5">
  <div class="bg-white rounded-sm p-1 border-1 size-fit">
    <label for="poverty">Armutsquote</label>
    <select class="underline cursor-pointer" name="poverty" bind:value={activePovertyLevel}>
      <option value="all">alle anzeigen</option>
      <option value="low">niedrig</option>
      <option value="medium">mittel</option>
      <option value="high">hoch</option>
    </select>
  </div>
  <div class="bg-white rounded-sm p-1 border-1 size-fit">
    <label for="temperature cursor-pointer">Temperatur:</label>
    <select class="underline" name="temperature" bind:value={activeTemperatureLevel}>
      <option value="all">alle anzeigen</option>
      <option value="low">niedrig</option>
      <option value="medium">mittel</option>
      <option value="high">hoch</option>
    </select>
  </div>
</div>
