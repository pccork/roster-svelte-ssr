import type { Roster } from "$lib/types/roster-types.js";
import { RosterMongoose } from "./roster.js";

export const rosterStore = {
  async find(): Promise<Roster[]> {
    const rosters = await RosterMongoose.find().populate("staff").populate("agency").lean();
    return rosters;
  },

  async findBy(agencyId: string): Promise<Roster[]> {
    const rosters = await RosterMongoose.find({ agency: agencyId }).populate("staff").populate("agency").lean();
    return rosters;
  },

  async add(roster: Roster): Promise<Roster | null> {
    const newRoster = new RosterMongoose({ ...roster });
    await newRoster.save();
    const populatedRoster = await RosterMongoose.findById(newRoster._id).populate("staff").populate("agency").lean();
    return populatedRoster;
  },

  async delete() {
    await RosterMongoose.deleteMany({});
  }
};
