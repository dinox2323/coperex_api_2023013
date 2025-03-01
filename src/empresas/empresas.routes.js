import { Router } from "express";
import { registroEmpresas,
<<<<<<< Updated upstream
        getEmpresas
        
=======
    editarEmpresa,
    listarEmpresas
>>>>>>> Stashed changes

} from "../empresas/empresas.controller.js";
import {
    registerEmpresasValidator,
<<<<<<< Updated upstream
    getEmpresasValidator
=======
    actualizarEmpresasValidator
>>>>>>> Stashed changes
} from "../middlewares/empresas-validator.js";

const router = Router();

<<<<<<< Updated upstream
router.post("/empresas", registerEmpresasValidator, registroEmpresas);
router.get("/empresas", getEmpresasValidator, getEmpresas);



=======
/**
 * @swagger
 * /empresas/registroEmpresa:
 *   post:
 *     summary: Register a new company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // ...define properties for the request body...
 *     responses:
 *       201:
 *         description: Company registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/registroEmpresa", registerEmpresasValidator, registroEmpresas);

/**
 * @swagger
 * /empresas/actualizarEmpresa/{uid}:
 *   patch:
 *     summary: Update company details
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Company ID
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
 *         description: Company updated successfully
 *       400:
 *         description: Invalid input
 */
router.patch("/actualizarEmpresa/:uid",actualizarEmpresasValidator,editarEmpresa)

/**
 * @swagger
 * /empresas/listarEmpresas:
 *   get:
 *     summary: List all companies
 *     responses:
 *       200:
 *         description: A list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 // ...define properties for the response items...
 */
router.get("/listarEmpresas", listarEmpresas)
>>>>>>> Stashed changes

export default router;

