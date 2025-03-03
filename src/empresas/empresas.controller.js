import Empresa from  "./empresas.model.js"
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';


export const registroEmpresas = async (req, res) => {
    const data = req.body
    try {

      data.yearsOfExperience = new Date().getFullYear() - data.fundation;

      const empresas = new Empresa(data);
      await empresas.save();
      res.status(201).json({
        empresas
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

  export const editarEmpresa = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const empresa = await Empresa.findById(uid);
        if (!empresa) {
            return res.status(404).json({
                success: false,
                msg: 'Empresa no encontrada',
            });
        }

        if (data.fundation) {
            data.yearsOfExperience = new Date().getFullYear() - data.fundation;
        }

        const empresaActualizada = await Empresa.findByIdAndUpdate(uid, data, { new: true });

        return res.status(200).json({
            success: true,
            msg: 'Empresa actualizada exitosamente',
            empresa: empresaActualizada,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error al actualizar la empresa',
            error: err.message,
        });
    }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const listarEmpresas = async (req, res) => {
    try {
        const { categoria, orden, aniosTrayectoria } = req.body;
        const filtro = construirFiltro(categoria, aniosTrayectoria);

        let empresas = await Empresa.find(filtro);
        empresas = ordenarEmpresas(empresas, orden);

        if (empresas.length === 0) {
            return enviarError(res, 404, "No se encontraron empresas con los filtros proporcionados");
        }

        const filePath = await crearExcel(empresas);

        res.status(200).json({
            success: true,
            msg: "Archivo generado exitosamente",
            filePath
        });

    } catch (error) {
        enviarError(res, 500, "Error al filtrar y exportar empresas", error);
    }
};

const construirFiltro = (categoria, aniosTrayectoria) => {
    const filtro = {};
    if (categoria) filtro.category = categoria;
    if (aniosTrayectoria) {
        const anioActual = new Date().getFullYear();
        filtro.fundation = { $lte: anioActual - Number(aniosTrayectoria) };
    }
    return filtro;
};

const ordenarEmpresas = (empresas, orden) => {
    if (orden === "A-Z") return empresas.sort((a, b) => a.name.localeCompare(b.name));
    if (orden === "Z-A") return empresas.sort((a, b) => b.name.localeCompare(a.name));
    return empresas;
};

const crearExcel = async (empresas) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Empresas");

    worksheet.columns = [
        { header: "Nombre", key: "name", width: 30 },
        { header: "Categoría", key: "categoria", width: 20 },
        { header: "Fundación", key: "fundation", width: 15 },
        { header: "Trayectoria", key: "yearsOfExperience", width: 20 },
        { header: "Impacto", key: "impactLevel", width: 15 },
        { header: "Dirección", key: "address", width: 30 },
        { header: "Teléfono", key: "phone", width: 15 },
        { header: "Correo", key: "email", width: 30 }
    ];

    empresas.forEach((empresa) => worksheet.addRow(empresa));

    const exportPath = path.join(__dirname, "./reportes");
    if (!fs.existsSync(exportPath)) fs.mkdirSync(exportPath, { recursive: true });

    const timer = Date.now()
    const filePath = path.join(exportPath, `Empresa${timer}.xlsx`);
    await workbook.xlsx.writeFile(filePath);

    return filePath;
};

const enviarError = (res, codigo, mensaje, error = null) => {
    const respuesta = { success: false, msg: mensaje };
    if (error) respuesta.error = error.message;
    res.status(codigo).json(respuesta);
};
