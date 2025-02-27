import { Router } from "express";
import {
    updateProfilePicture,
    editProfile
} from "./admin.controller.js";
import {
    updateProfilePicture,
    editProfileValidator
} from "../middlewares/admin-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads";

const router = Router();

router.patch("/editProfile/:uid", editProfileValidator, editProfile);

router.patch(
    "/updateProfilePicture/:uid",
    uploadProfilePicture.single("profilePicture"),
    updateProfilePictureValidator,
    updateProfilePicture
);
export default router;
