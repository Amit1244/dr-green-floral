"use server";
import DBConnect from "./db-connect";
import { User } from "./db-schemas";

// OPTIONS LOGIN SESSION ------------------------------------------------
export async function CreateOrUpdateUser(searchFor, value) {
    await DBConnect();

    const userUpdated = await User.findOneAndUpdate(searchFor, value, {
        upsert: true,
        new: true,
    });
    return JSON.stringify(userUpdated);
}
export async function FindUser(searchFor, options) {
    await DBConnect();

    const userUpdated = await User.findOne(searchFor, options);
    return JSON.stringify(userUpdated);
}
// OPTIONS LOGIN SESSION ------------------------------------------------
