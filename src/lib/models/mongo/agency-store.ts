import type { Agency } from "$lib/types/roster-types.js";
import { AgencyMongoose } from "./agency.js";

export const agencyStore = {
  async find(): Promise<Agency[]> {
    const agencies = await AgencyMongoose.find().lean();
    return agencies;
  },

  async findOne(id: string): Promise<Agency | null> {
    const agency = await AgencyMongoose.findOne({ _id: id }).lean();
    return agency;
  },

  async findBy(lastName: string, firstName: string): Promise<Agency | null> {
    const agency = await AgencyMongoose.findOne({
      lastName,
      firstName
    }).lean();
    return agency;
  }
};
