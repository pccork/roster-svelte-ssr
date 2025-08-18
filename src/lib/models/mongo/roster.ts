import type { Roster } from "$lib/types/roster-types";
import mongoose, { Model } from "mongoose";

const rosterSchema = new mongoose.Schema<Roster>({
  hour: Number,
  profession: String,
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency"
  },
  lat: Number,
  lng: Number
});

let RosterMongoose: Model<Roster>;
try {
  RosterMongoose = mongoose.model<Roster>("Roster");
} catch {
  RosterMongoose = mongoose.model<Roster>("Roster", rosterSchema);
}

export { RosterMongoose };
