import Admin from "../admin/admin.model.js";
import Empresas from "../empresas/empresas.model.js"


export const emailExists = async (email = "") => {
    const existe = await Admin.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const emailExistEmpresas = async (email = "") => {
    const existe = await Empresas.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const addressExists = async (address = "") => {
    const existe = await Empresas.findOne({address})
    if(existe){
        throw new Error(`The address ${address} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await Admin.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const adminExists = async (uid = " ") => {
    const existe = await Admin.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const emailEmpresaExist = async (email = "") => {
    const existe = await Empresas.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const empresaExist = async (uid = " ") => {
    const existe = await Empresas.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}
