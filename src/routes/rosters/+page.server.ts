import { rosterService } from "$lib/services/roster-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    donations: await rosterService.getRosters(),
    candidates: await rosterService.getAgencies()
  };
}