import { dbConnect } from "$lib/models/db";
import type { Handle } from "@sveltejs/kit";

await dbConnect();

export const handle: Handle = async ({ event, resolve }) => {
  const sessionJson = event.cookies.get('roster-user');
  if (sessionJson) {
    try {
      const session = JSON.parse(sessionJson);
      event.locals.user = session;
    } catch (err) {
      console.error("Failed to parse session cookie:", err);
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }
  console.log("All cookies:", event.cookies.getAll());
  return await resolve(event);
};


/*

export const handle: Handle = async ({ event, resolve }) => {
  
  const session = event.cookies.get('session_id');
  console.log('Session ID:', session);
  
  const response = await resolve(event);
  return response;
};
*/

