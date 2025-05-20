import { rosterService } from "$lib/services/roster-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    return {
      rosters: await rosterService.getRosters(session.token),
      agencies: await rosterService.getAgencies(session.token)
    };
  }
};

/*
import { rosterService } from "$lib/services/roster-service";
import type { Session } from "$lib/types/roster-types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    return {
      rosters: await rosterService.getRosters(session.token),
      agencies: await rosterService.getAgencies(session.token)
    };
  }
};

*/
