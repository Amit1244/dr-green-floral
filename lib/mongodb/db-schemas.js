"use server";

import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    clientId: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true, dropDups: true },
    email: { type: String, unique: true, required: true, dropDups: true },
    hash: { type: String, required: true },
    token: { type: String },
    tokenCreatedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    scheduledAppointment: {
        type: String,
    },
    scheduledAppointmentAt: {
        type: Date,
    },
});
export const User = models.User || model("User", userSchema, "users");
