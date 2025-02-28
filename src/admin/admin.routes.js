import { Router } from "express";
import {
    updateProfilePicture,
    editProfile
} from "./admin.controller.js";
import {
    updateProfilePictureValidator,
    editProfileValidator
} from "../middlewares/admin-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.patch("/editProfile/:uid", editProfileValidator, editProfile);

router.patch(
    "/updateProfilePicture/:uid",
    uploadProfilePicture.single("profilePicture"),
    updateProfilePictureValidator,
    updateProfilePicture
);
export default router;
