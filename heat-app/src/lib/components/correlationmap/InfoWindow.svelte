<script lang="ts">
  import Button from "./Button.svelte";

  export let onClose: () => void;
</script>

<div
  class="absolute max-w-[350px] sm:max-w-[600px] mx-auto inset-0 flex items-center justify-center z-50"
>
  <div class="bg-white px-5 py-6 border-1 h-fit rounded-sm shadow-lg relative max-w-md w-full">
    <Button customCSS="absolute top-2 right-2" ariaLabel="Close info window" handleClick={onClose}>
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
        class="feather feather-x"
        ><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg
      >
    </Button>
    <h2 class="text-xl font-semibold mb-5">Datenquellen</h2>
    <h3 class="text-base font-semibold mb-2">Armutsquote</h3>
    <p>
      Anteil der Arbeitslosen, sowie andere Empfänger*innen von Tranferleistungen als Anteil an der
      Bevölkerung. (Monitoring Soziale Standentwicklung Berlin 2023)
    </p>
    <h3 class="text-base font-semibold mb-2 mt-5">Oberflächtentemperatur</h3>
    <p>
      Mittlere Oberflächentemperatur zur Mittagszeit an wolkenfreien Tagen in den Sommermonaten
      2019-2024 in Grad Celsius. (© LUP - Luftbild Umwelt Planung GmbH 2025, CC BY-NC 4.0)
    </p>
  </div>
</div>
