import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-error.js";
import { emailEmpresaExist , empresaExist} from "../helpers/db-validator.js";

export const registerEmpresasValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("phone").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailEmpresaExist),
    body("address").notEmpty().withMessage("La direccion es requerida"),
    body("impactLevel").notEmpty().withMessage("Es requerido el nivel de imacpto"),
    body("category").notEmpty().withMessage("Es necesario la categoria de la empresa"),
    validarCampos,
    handleErrors
];

export const actualizarEmpresasValidator = [
    param("uid").notEmpty().withMessage("El uid es requerido"),
    param("uid").custom(empresaExist),
    validarCampos,
    handleErrors
]
