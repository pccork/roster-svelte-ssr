import axios from "axios";
import type { Session, User } from "$lib/types/roster-types";
import type { Agency, Roster } from "$lib/types/roster-types";
import { currentRosters, currentAgencies,loggedInUser} from "$lib/runes.svelte";
import { computeByAgency, computeByProfession } from "./roster-utils";


export const rosterService = {
  // baseUrl: "http://localhost:4000",
  baseUrl: "http://glitch.com/edit/#!/terrific-acute-bison",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { 
        email, password 
      });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        this.saveSession(session, email);
        await this.refreshRosterInfo();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  
  saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.roster = JSON.stringify(loggedInUser);
  },
   
  async restoreSession() {
    const savedLoggedInUser = localStorage.roster;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
    }
    await this.refreshRosterInfo();
  },

  clearSession() {
    currentRosters.rosters = [];
    currentAgencies.agencies = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("roster");
  },

  async refreshRosterInfo() {
    if (loggedInUser.token) {
      currentRosters.rosters = await this.getRosters(loggedInUser.token);
      currentAgencies.agencies = await this.getAgencies(loggedInUser.token);
      computeByProfession(currentRosters.rosters);
      computeByAgency(currentRosters.rosters, currentAgencies.agencies)
    }
  },

  disconnect() {
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("roster");
  },

  


  async roster(roster: Roster, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(
        this.baseUrl + "/api/agencies/" + roster.agency + "/rosters",
        roster
      );
      await this.refreshRosterInfo();
      return response.status == 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getAgencies(token: string): Promise<Agency[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/agencies");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getRosters(token: string): Promise<Roster[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/rosters");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  


};

