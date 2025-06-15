<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    options: Snippet;
    value: string;
    label: string;
    name: string;
  }
  let { options, value = $bindable("low"), label, name }: Props = $props();
</script>

<div class="relative bg-white rounded-sm p-1 border-1 size-fit">
  <label for="temperature">{label}</label>
  <select
    class="underline appearance-none cursor-pointer {value == 'all' ? 'pr-5' : 'pr-0.5'}"
    {name}
    bind:value
  >
    {@render options()}
  </select>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="absolute right-0 top-0 pt-1 pointer-events-none"
    ><polyline points="6 9 12 15 18 9"></polyline></svg
  >
</div>
