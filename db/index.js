import mongoose from "mongoose";
import mongoUri from "../config/config.js";

export async function connect() {
    try {
        return mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log("could not connect to mongo");
        process.exit(1);
    }
};