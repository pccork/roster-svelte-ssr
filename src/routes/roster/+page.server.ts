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

export const actions = {
  roster: async ({ request, cookies }) => {
    const cookieStr = cookies.get("roster-user") as string;
    if (cookieStr) {
      const session = JSON.parse(cookieStr) as Session;
      if (session) {
        const form = await request.formData();
        const roster = {
          hour: form.get("hour") as unknown as number,
          profession: form.get("profession") as string,
          agency: form.get("agency") as string,
          lat: form.get("lat") as unknown as number,
          lng: form.get("lng") as unknown as number,
          staff: session._id
        };
        const newRoster = await rosterService.roster(roster, session.token);
        return newRoster;
      }
    }
  }
};
