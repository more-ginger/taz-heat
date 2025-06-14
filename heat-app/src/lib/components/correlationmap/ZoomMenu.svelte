<script lang="ts">
  interface Props {
    zoomOut: () => void;
    zoomIn: () => void;
    resetZoom: () => void;
  }

  let { zoomOut, zoomIn, resetZoom }: Props = $props();
</script>

<div class="absolute bottom-16.5 sm:top-0 right-0 flex flex-col gap-1 z-10 p-2.5 sm:p-5">
  <button
    class="size-8 bg-white hover:bg-gray-100 flex justify-center items-center border-1 rounded-sm cursor-pointer"
    onclick={zoomIn}>+</button
  >
  <button
    class="size-8 bg-white hover:bg-gray-100 flex justify-center items-center border-1 rounded-sm cursor-pointer"
    onclick={zoomOut}>-</button
  >
  <button
    class="size-8 bg-white hover:bg-gray-100 flex justify-center items-center border-1 rounded-sm cursor-pointer"
    onclick={resetZoom}
    aria-label="reset zoom"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.25"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
      />
    </svg>
  </button>
</div>
