import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-error.js";

export const registerEmpresasValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("phone").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("address").custom(addressExists),
    body("impactLevel").notEmpty().withMessage("Es requerido el nivel de imacpto"),
    body("yearsOfExperience").notEmpty().withMessage("Necesario los anios de experiencia"),
    body("category").notEmpty().withMessage("Es necesario la categoria de la empresa"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];
