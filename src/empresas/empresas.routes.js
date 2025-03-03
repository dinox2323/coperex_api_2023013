import { Router } from "express";
import { registroEmpresas, editarEmpresa, listarEmpresas } from "../empresas/empresas.controller.js";
import { registerEmpresasValidator, actualizarEmpresasValidator } from "../middlewares/empresas-validator.js";

const router = Router();

/**
 * @swagger
 * /registroEmpresa:
 *   post:
 *     summary: Register a new company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/registroEmpresa", registerEmpresasValidator, registroEmpresas);

/**
 * @swagger
 * /actualizarEmpresa/{uid}:
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
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: Invalid input
 */
router.patch("/actualizarEmpresa/:uid", actualizarEmpresasValidator, editarEmpresa);

/**
 * @swagger
 * /listarEmpresas:
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   phone:
 *                     type: string
 */
router.get("/listarEmpresas", listarEmpresas);

export default router;