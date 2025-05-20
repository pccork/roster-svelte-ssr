export const load = async ({ cookies }) => {
  cookies.delete("roster-user", { path: "/" });
};
