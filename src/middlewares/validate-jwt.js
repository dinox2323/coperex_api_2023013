import jwt from "jsonwebtoken"
import Admin from "../admin/admin.model.js"

export const validateJWT = async (req, res, next) => {
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(400).json({
                success: false,
                message: "No existe token en la petición"
            })
        }

        token = token.replace(/^Bearer\s+/, "")

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const admin = await Admin.findById(uid)

        if(!admin){
        return res.status(400).json({
                success: false,
                message: "admin no existe en la DB"
        }) 
        }

        if(admin.status === false){
            return res.status(400).json({
                success: false,
                message: " admin desactivado previamente"
            })
        }

        req.administrador = admin
        next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message : "Error al validar el token",
            error: err.message
        })
    }
}