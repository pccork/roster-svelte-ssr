import { rosterService } from "$lib/services/roster-service";
import type { Session } from "$lib/types/roster-types";
import type { PageServerLoad } from "./$types";
import type { RequestEvent } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  /*const { session } = await parent();
  if (session) { */
    
    return {
      rosters: await rosterService.getRosters(),
      agencies: await rosterService.getAgencies()
    };
  
};

export const actions = {
  roster: async ({ request, cookies: RequestEvent }) => {
    const cookieStr = cookies.get("roster-user") as string;
    if (!cookieStr) {
      return { success: false, error: "No user session found" };
    }
      const session = JSON.parse(cookieStr) as Session;
      if (!session) {
        return { success: false, error: "Invalid session" };
        }
        const form = await request.formData();
        const roster = {
          hour: form.get("hour") as unknown as number,
          profession: form.get("profession") as string,
          agency: form.get("agency") as string,
          lat: form.get("lat") as unknown as number,
          lng: form.get("lng") as unknown as number,
          staff: session._id
        };

        try {
        const newRoster = await rosterService.roster(roster);
        return newRoster;
        } catch (error) {
        return {
          success: false,
          error: "Failed to create roster"
        };
      
    }
  }
};
