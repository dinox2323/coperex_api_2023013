import { body,query } from "express-validator";
import { emailExistEmpresas,addressExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-error.js";
import { emailEmpresaExist , empresaExist} from "../helpers/db-validator.js";

export const registerEmpresasValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("phone").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
<<<<<<< Updated upstream
    body("email").custom(emailExistEmpresas),
    body("address").custom(addressExists),
    body("impactLevel").notEmpty().withMessage("Es requerido el nivel de imacpto"),
    body("createdDateCreation").notEmpty().withMessage("Necesaria la fecha de fundacion"),
=======
    body("email").custom(emailEmpresaExist),
    body("address").notEmpty().withMessage("La direccion es requerida"),
    body("impactLevel").notEmpty().withMessage("Es requerido el nivel de imacpto"),
>>>>>>> Stashed changes
    body("category").notEmpty().withMessage("Es necesario la categoria de la empresa"),
    validarCampos,
    handleErrors
];

<<<<<<< Updated upstream
export const getEmpresasValidator = [
    query("sortBy").optional().isString().withMessage("El parámetro sortBy debe ser una cadena de texto"),
    query("order").optional().isIn(['asc', 'desc']).withMessage("El parámetro order debe ser 'asc' o 'desc'"),
    query("category").optional().isString().withMessage("El parámetro category debe ser una cadena de texto"),
    query("minYearsOfExperience").optional().isInt({ min: 0 }).withMessage("El parámetro minYearsOfExperience debe ser un número entero positivo"),
    validarCampos,
    handleErrors
];
=======
export const actualizarEmpresasValidator = [
    param("uid").notEmpty().withMessage("El uid es requerido"),
    param("uid").custom(empresaExist),
    validarCampos,
    handleErrors
]
>>>>>>> Stashed changes
