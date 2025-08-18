import { rosterService } from "$lib/services/roster-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    rosters: await rosterService.getRosters(),
    agencies: await rosterService.getAgencies()
  };
}