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

<div class="flex flex-col py-2">
  <label class="relative inline-flex items-center cursor-pointer flex-row gap-2.5">
    <span>Filter</span>
    <input type="checkbox" bind:checked={filterActive} class="sr-only peer" />
    <div
      class="relative w-10 h-5 bg-white border-1 border-black peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[-1px] after:start-[-1px] after:bg-white after:border-black after:border-1 after:rounded-full after:size-5 after:transition-all peer-checked:bg-blue-600"
    ></div>
  </label>
  <div class={
    `
      ${filterActive ? "text-black" : "text-gray-300 hidden md:flex"} 
      flex 
      p-2 
      border 
      border-gray-200 
      m-2
      text-sm
      rounded-sm`
    }>
    <div class="pr-2">Nach:</div>
    <div>
      <div>
        <label for="poverty">Armuts Quote</label>
        <select
          class="underline"
          name="poverty"
          bind:value={activePovertyLevel}
          disabled={!filterActive}
        >
          <option value="low">niedrig</option>
          <option value="medium">mittel</option>
          <option value="high">hoch</option>
        </select>
      </div>
      <div>
        <label for="temperature">Oberflächentemperatur:</label>
        <select
          class="underline"
          name="temperature"
          bind:value={activeTemperatureLevel}
          disabled={!filterActive}
        >
          <option value="low">niedrig</option>
          <option value="medium">mittel</option>
          <option value="high">hoch</option>
        </select>
      </div>
    </div>
  </div>
</div>
