import { rosterService } from "$lib/services/roster-service";
//import type { Session } from "$lib/types/roster-types";
import type { PageServerLoad } from "./$types";

/*Uses rosterService to fetch data from an API

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


export const load: PageServerLoad = async () => {
  /*const { session } = await parent();
  if (session) {*/
    
    return {
      rosters: await rosterService.getRosters(),
      agencies: await rosterService.getAgencies()
    };
  }






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
