import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/admin-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.post(
    "/login",
    loginValidator,
    login
  );

  router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    register
  );
  
  export default router;