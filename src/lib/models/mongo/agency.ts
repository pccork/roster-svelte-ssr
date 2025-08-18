import type { Agency } from "$lib/types/roster-types";
import mongoose, { Model } from "mongoose";

const agencySchema = new mongoose.Schema<Agency>({
  AgencyName: String,
  code: String,
  office: String
});

let AgencyMongoose: Model<Agency>;
try {
  AgencyMongoose = mongoose.model<Agency>("Agency");
} catch {
  AgencyMongoose = mongoose.model<Agency>("Agency", agencySchema);
}

export { AgencyMongoose };
