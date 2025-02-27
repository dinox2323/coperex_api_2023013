import { hash, verify } from "argon2"
import Admin from "../admin/admin.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const createAdminUser = async () => {
    try {
        const existingAdmin = await Admin.findOne({ role: "ADMIN_ROLE" });
        if (existingAdmin) {
            console.log("Admin ya existe");
            return;
        }

        const adminData = {
            name: "Admin",
            username: "admin",
            surname: "admin",
            phone: "12345678",
            email: "admin@tuapp.com",
            password: await hash("admin123"),
            role: "ADMIN_ROLE"
        };

        await Admin.create(adminData);
        console.log("Admin creado con éxito");
    } catch (err) {
        console.error("Error al crear el admin:", err);
    }
};


export const register = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const admin = await Admin.create(data);

        return res.status(201).json({
            message: "Admin has been created",
            name: admin.name,
            email: admin.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "Admin registration failed",
            error: err.message
        });
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const admin = await Admin.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!admin){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(admin.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(admin.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: admin.profilePicture
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
}
