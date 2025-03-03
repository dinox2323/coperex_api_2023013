import { Router } from "express";
import {
    ProfilePicture,
    editProfile
} from "./admin.controller.js";
import {
    updateProfilePictureValidator,
    editProfileValidator
} from "../middlewares/admin-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /editProfile/{uid}:
 *   patch:
 *     summary: Edit user profile
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // ...define properties for the request body...
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 */
router.patch("/editProfile/:uid", editProfileValidator, editProfile);

/**
 * @swagger
 * /updateProfilePicture/{uid}:
 *   patch:
 *     summary: Update user profile picture
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *       400:
 *         description: Invalid input
 */
router.patch(
    "/updateProfilePicture/:uid",
    uploadProfilePicture.single("profilePicture"),
    updateProfilePictureValidator,
    ProfilePicture
);

export default router;
