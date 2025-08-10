import { rosterService } from "$lib/services/roster-service";
//import type { Session } from "$lib/types/roster-types";
import type { PageServerLoad } from "./$types";

/*

export const load: PageServerLoad = async ({ cookies }) => {
  const cookieStr = cookies.get("donation-user") as string;
  if (cookieStr) {
    const session = JSON.parse(cookieStr) as Session;
    return {
      rosters: await rosterService.getRosters(session.token),
      agencies: await rosterService.getAgencies(session.token)
    };
  }
};
*/


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

export const load: PageServerLoad = async ({ cookies }) => {
  const cookieStr = cookies.get("roster-user") as string;
  if (cookieStr) {
    const session = JSON.parse(cookieStr) as Session;
    return {
      rosters: await rosterService.getRosters(session.token),
      agencies: await rosterService.getAgencies(session.token)
    };
  }
};

*/
