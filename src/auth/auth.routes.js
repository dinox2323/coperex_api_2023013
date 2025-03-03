import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/admin-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid input
 */
router.post(
    "/login",
    loginValidator,
    login
);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Invalid input
 */
router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    register
);

export default router;