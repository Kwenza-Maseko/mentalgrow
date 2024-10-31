// models/User.ts
import mongoose, { Schema } from "mongoose";


const UserSchema: Schema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    username: { type: String },
    photo: { type: String },
    first_name: { type: String },
    last_name: { type: String },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
