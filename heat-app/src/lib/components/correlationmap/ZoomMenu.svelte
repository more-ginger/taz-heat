<script lang="ts">
  import Button from "../uiElements/Button.svelte";

  interface Props {
    zoomOut: () => void;
    zoomIn: () => void;
    resetZoom: () => void;
  }

  let { zoomOut, zoomIn, resetZoom }: Props = $props();
</script>

<div class="absolute bottom-20.5 sm:top-0 right-0 flex flex-col gap-1 z-10 p-2.5 sm:p-5">
  <Button handleClick={zoomIn} ariaLabel="zoom in">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-plus"
      ><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg
    >
  </Button>
  <Button handleClick={zoomOut} ariaLabel="zoom out"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg
    ></Button
  >
  <Button handleClick={resetZoom} ariaLabel="reset zoom">
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
    </svg></Button
  >
</div>
