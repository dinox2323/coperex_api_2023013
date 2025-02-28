import { body,query } from "express-validator";
import { emailExistEmpresas,addressExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-error.js";

export const registerEmpresasValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("phone").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExistEmpresas),
    body("address").custom(addressExists),
    body("impactLevel").notEmpty().withMessage("Es requerido el nivel de imacpto"),
    body("createdDateCreation").notEmpty().withMessage("Necesaria la fecha de fundacion"),
    body("category").notEmpty().withMessage("Es necesario la categoria de la empresa"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const getEmpresasValidator = [
    query("sortBy").optional().isString().withMessage("El parámetro sortBy debe ser una cadena de texto"),
    query("order").optional().isIn(['asc', 'desc']).withMessage("El parámetro order debe ser 'asc' o 'desc'"),
    query("category").optional().isString().withMessage("El parámetro category debe ser una cadena de texto"),
    query("minYearsOfExperience").optional().isInt({ min: 0 }).withMessage("El parámetro minYearsOfExperience debe ser un número entero positivo"),
    validarCampos,
    handleErrors
];