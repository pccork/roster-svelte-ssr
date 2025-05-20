import axios from "axios";
import type { Session, User } from "$lib/types/roster-types";
import type { Agency, Roster } from "$lib/types/roster-types";



export const rosterService = {
     baseUrl: "http://localhost:4000",
  // baseUrl: "https://rostercare-4.onrender.com",

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

