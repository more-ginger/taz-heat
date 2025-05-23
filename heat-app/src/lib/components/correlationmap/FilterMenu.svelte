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
</script>

<div class="flex flex-col">
  <label>
    <input type="checkbox" bind:checked={filterActive} />
    <span>Filter</span>
  </label>

  {#if filterActive}
    <div>
      <div>Select area by:</div>

      <label for="poverty">Poverty Level:</label>
      <select name="poverty" bind:value={activePovertyLevel}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label for="temperature">temperature:</label>
      <select name="temperature" bind:value={activeTemperatureLevel}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  {/if}
</div>
