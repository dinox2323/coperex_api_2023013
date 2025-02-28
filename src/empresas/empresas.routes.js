import { Router } from "express";
import { registroEmpresas,
        getEmpresas
        

} from "../empresas/empresas.controller.js";
import {
    registerEmpresasValidator,
    getEmpresasValidator
} from "../middlewares/empresas-validator.js";

const router = Router();

router.post("/empresas", registerEmpresasValidator, registroEmpresas);
router.get("/empresas", getEmpresasValidator, getEmpresas);




export default router;

