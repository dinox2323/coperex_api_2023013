import { hash, verify } from "argon2";
import Admin from "./admin.model.js";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const ProfilePicture = async (req, res) => {

export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params;
        let newProfilePicture = req.file ? req.file.filename : null;

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                msg: 'No se proporcionó una nueva foto de perfil',
            });
        }

        const admin = await Admin.findById(uid);

        if (admin.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
            await fs.unlink(oldProfilePicturePath);
        }

        admin.profilePicture = newProfilePicture;
        await admin.save();

        res.status(200).json({
            success: true,
            msg: 'Foto de perfil actualizada',
            admin,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la foto de perfil',
            error: err.message
        });
    }
};

export const editProfile = async (req, res) => {
    try {
        const { uid } = req.params;
        const { name, username, currentPassword, newPassword } = req.body;

        const admin = await Admin.findById(uid);
        if (!admin) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado',
            });
        }

        if (currentPassword && newPassword) {
            const isPasswordValid = await verify(admin.password, currentPassword);
            if (!isPasswordValid) {
                return res.status(400).json({
                    success: false,
                    msg: 'Contraseña actual incorrecta',
                });
            }
            admin.password = await hash(newPassword);
        }

        if (name) admin.name = name;
        if (username) admin.username = username;

        await admin.save();

        return res.status(200).json({
            success: true,
            msg: 'Perfil actualizado exitosamente',
            admin,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error al actualizar el perfil',
            error: err.message,
        });
    }
};