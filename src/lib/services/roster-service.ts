//import axios from "axios";
import type { RosterService, Session, User } from "$lib/types/roster-types";
import type { Agency, Roster } from "$lib/types/roster-types";
import { userStore } from "$lib/models/mongo/user-store";
import { rosterStore } from "$lib/models/mongo/roster-store";
import { agencyStore } from "$lib/models/mongo/agency-store";

/*
export const rosterService = {
    baseUrl: "http://localhost:4000",
    //baseUrl: "https://rostercare-4.onrender.com",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }, */

    export const rosterService: RosterService = {
      async signup(user: User): Promise<boolean> {
        try {
          const newUser = await userStore.add(user);
          return !!newUser;
        } catch (error) {
          console.log(error);
          return false;
        }
      },

    async login(email: string, password: string): Promise<Session | null> {
    try {
      const user = await userStore.findBy(email);
      if (user !== null && user.password === password) {
        const session = {
          name: `${user.firstName} ${user.lastName}`,
          token: user._id!.toString(),
          _id: user._id!.toString(),
          email: user.email
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async rostering(roster: Roster) {
    try {
      const newRoster = await rosterStore.add(roster);
      return JSON.parse(JSON.stringify(newRoster));
    } catch (error) {
      return false;
    }
  },

  async getAgencies(): Promise<Agency[]> {
    try {
      const agencies = await agencyStore.find();
      return JSON.parse(JSON.stringify(agencies));
    } catch (error) {
      return [];
    }
  },

  async getRosters(candidateId?: string): Promise<Roster[]> {
    try {
      if (candidateId) {
        const rosters = await rosterStore.findBy(candidateId);
        return JSON.parse(JSON.stringify(rosters)); 
      } else {
        const rosters = await rosterStore.find();
        return JSON.parse(JSON.stringify(rosters));
      }
    } catch (error) {
      return [];
    }
  }
};

  /*
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
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },



  async roster(roster: Roster, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(
        this.baseUrl + "/api/agencies/" + roster.agency + "/rosters",
        roster
      );
      return response.data
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

*/