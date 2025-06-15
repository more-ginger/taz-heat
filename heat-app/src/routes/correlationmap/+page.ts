import geodata from "$lib/data/2023_mss_2023_sgb_lst_map.json";
import uxtexting from "$lib/data/uxtexting.json";

import type { PageLoad } from "./$types";

const checkParam = function (temp: string | null) {
  if (temp && ["high", "low", "medium", "all"].includes(temp)) {
    return temp;
  } else {
    return "all";
  }
};

export const load: PageLoad = ({ url }) => {
  const params = new URLSearchParams(url.search);
  const temperature = checkParam(params.get("temperature"));
  const poverty = checkParam(params.get("poverty"));

  return {
    geodata: geodata,
    temperatureParam: temperature,
    povertyParam: poverty,
    uxtexting: uxtexting,
  };
};
