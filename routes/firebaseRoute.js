import express from "express";
const router = express.Router();
import admin from "firebase-admin";
import serviceAccount from "../fireBase.js"
import { failedResponse, successResponse } from "../utils/response.js";
import Ad from "../models/AdModel.js";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        "https://eidcarosse-7d282-default-rtdb.europe-west1.firebasedatabase.app/",
});

const database = admin.database();

database.ref(".info/connected").on("value", (snapshot) => {
    if (snapshot.val() === true) {
        console.log("Connected to Firebase");
    } else {
        console.log("Disconnected from Firebase");
    }
});

router.post('/', async(req, res) => {
    const { userId, productId, productUserId } = req.body;
    
    // Sorting users and then appending productId to compute the chatroomId
    const users = [userId, productUserId];
    const chatroomIdComponents = [userId, productUserId, productId];
    const chatroomId = chatroomIdComponents.join("_");

    try {
        // For each userId, add the chatroomId to their room list (if not already present)
        for (const userId of users) {
            const userRoomsRef = database.ref(`users/${userId}/rooms`);
            const snapshot = await userRoomsRef.once("value");
            const userRooms = snapshot.val() || [];

            // Check for duplicates
            if (!userRooms.includes(chatroomId)) {
                userRooms.push(chatroomId);
                await userRoomsRef.set(userRooms);
            }
        }

        const ad = await Ad.findByIdAndUpdate(productId, {$push: {chatIds: chatroomId }}, { new: true });
        console.log(ad);
        return successResponse(res, 200, 'chat room created successfully.', true, chatroomId);
        res.send({ chatroomId });
    } catch (error) {
        return failedResponse(res, 500, 'failed to create room', false);
    }
});

export default router;