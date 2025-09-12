import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { createApp } from "./app";


setGlobalOptions({ maxInstances: 10 });

const app = createApp();

export const api = onRequest(app.getApp());
logger.info("API initialized");

if (process.env.NODE_ENV !== "production") {
    app.start(3000);
}