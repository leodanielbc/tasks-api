import admin from 'firebase-admin';
import path from "path";

export function initFirebase() {

    if (!admin.apps.length) {

        if (process.env.FUNCTIONS_EMULATOR || process.env.NODE_ENV === "production") {
            admin.initializeApp();
            console.log("✅ Firebase initialized with default credentials (Firebase Functions)");
            return;
        }

        const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

        if (!serviceAccountPath) {
            throw new Error("❌ GOOGLE_APPLICATION_CREDENTIALS no está definido en .env");
        }

        const serviceAccount = path.resolve(serviceAccountPath);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        console.log("✅ Firebase initialized with service account");
    }
}


export const firestore = () => admin.firestore();