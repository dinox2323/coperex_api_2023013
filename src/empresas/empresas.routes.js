import { Router } from "express";
import { registroEmpresas 

} from "../empresas/empresas.controller.js";
import {
    registerEmpresasValidator
} from "../middlewares/empresas-validator.js";

const router = express.Router();

router.post("/empresas", registerEmpresasValidator, registroEmpresas);

export default router;

