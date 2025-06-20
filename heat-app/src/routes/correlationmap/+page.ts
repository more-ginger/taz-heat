import geodata from "$lib/data/2023_mss_2023_sgb_lst_map.json";
import uxtexting from "$lib/data/uxtexting.json";

import type { PageLoad } from "./$types";

export const load: PageLoad = ({ url }) => {
  // const params = new URLSearchParams(url.search);
  // const temperature = checkParam(params.get("temperature"));
  // const poverty = checkParam(params.get("poverty"));

  return {
    geodata: geodata,
    temperatureParam: "high",
    povertyParam: "all",
    url: url,
    uxtexting: uxtexting,
  };
};
