import { rosterService } from "$lib/services/roster-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const agencies = await rosterService.getAgencies();
  const agency = agencies.find((c) => c._id === params.id);
  return {
    agency,
    rosters: await rosterService.getRosters(params.id)
  };
};
