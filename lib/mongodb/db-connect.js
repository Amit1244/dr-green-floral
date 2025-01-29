"use server";

import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;

// const connection = {};

export default async function DBConnect() {
    // if (connection.isConnected) {
    //     return;
    // }

    const db = await mongoose.connect(uri);

    // connection.isConnected = db.connections[0].readyState;

    return db;
}
