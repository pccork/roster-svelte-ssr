import { dbConnect } from "$lib/models/db";
import type { Handle } from "@sveltejs/kit";

await dbConnect();

export const handle: Handle = async ({ event, resolve }) => {
  
  const session = event.cookies.get('session_id');
  console.log('Session ID:', session);
  
  const response = await resolve(event);
  return response;
};
