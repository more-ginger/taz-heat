<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    handleClick: any;
    ariaLabel: string;
    customCSS?: string;
    children?: Snippet;
  }
  let { handleClick, ariaLabel, customCSS, children }: Props = $props();
</script>

<button
  class="{customCSS} size-8 bg-white hover:bg-gray-100 inline-flex justify-center items-center border-1 rounded-sm cursor-pointer"
  onclick={handleClick}
  aria-label={ariaLabel}
>
  {@render children?.()}
</button>
