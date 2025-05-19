<script lang="ts">
  interface Props {
    filterActive: boolean
    activePovertyLevel: string
  }

  //bindable filter menu values
  let {
    filterActive = $bindable(false),
    activePovertyLevel = $bindable('low'),
  }: Props = $props()
</script>

<div class="flex flex-col">
  <label>
    <input type="checkbox" bind:checked={filterActive} />
    <span>Filter</span>
  </label>

  {#if filterActive}
    <div>
      <label for="poverty">Show only Poverty Level:</label>
      <select name="poverty" bind:value={activePovertyLevel}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  {/if}
</div>
