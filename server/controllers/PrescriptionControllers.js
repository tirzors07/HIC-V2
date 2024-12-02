import multer from 'multer';
import path from 'path';
import fs from 'fs';
import PrescriptionModel from "../models/PrescriptionModel.js";
//multer para almacenar las imagenes en src/uploads
// Configuración de multer para manejar la subida de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Nombre único del archivo
    }
});

const upload = multer({ storage });

export const uploadImage = upload.single('image'); // Middleware para subir una sola imagen

// Obtener todas las recetas
export const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await PrescriptionModel.findAll();
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Obtener una receta por su ID
export const getPrescription = async (req, res) => {
    try {
        const prescription = await PrescriptionModel.findOne({
            where: { prescription_id: req.params.id },
        });

        if (prescription) {
            res.json(prescription);
        } else {
            res.status(404).json({ message: "Receta no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Crear una nueva receta
/*export const createPrescription = async (req, res) => {
    const { user_id } = req.body;

    try {
        // Validar que el archivo haya sido subido
        if (!req.file) {
            return res.status(400).json({ message: "No se ha subido ninguna imagen." });
        }

        // Validar que el user_id esté presente
        if (!user_id) {
            return res.status(400).json({ message: "Falta el ID del usuario." });
        }

        // Crear una nueva receta
        const newPrescription = await PrescriptionModel.create({
            user_id,
            image_url: `/uploads/${req.file.filename}`, // Ruta de la imagen
            image_format: req.file.mimetype.split('/')[1].toUpperCase(), // Extraer el formato
            image_size: req.file.size, // Tamaño de la imagen
        });

        res.status(201).json({
            message: "Receta creada",
            prescription: newPrescription,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};*/
export const createPrescription = async (req, res) => {
    const { user_id, image_url, image_format, image_size } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        if (!user_id || !image_url || !image_format || !image_size) {
            return res.status(400).json({ message: "Faltan campos requeridos." });
        }

        const validFormats = ['JPEG', 'PNG', 'JPG'];
        if (!validFormats.includes(image_format)) {
            return res.status(400).json({ message: "Formato de imagen no válido." });
        }

        const newPrescription = await PrescriptionModel.create({
            user_id,
            image_url: imageUrl,
            image_format: req.file.mimetype,
            image_size: req.file.size,
        });

        res.status(201).json({
            message: "Receta creada",
            prescription: newPrescription,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Crear una nueva receta con imagen
/*export const createPrescription = async (req, res) => {
    const { user_id } = req.body;

    // Verificar si el usuario está presente en la base de datos
    if (!user_id) {
        return res.status(400).json({ message: "El campo user_id es obligatorio." });
    }

    // Si el archivo está presente, guardamos la URL de la imagen
    if (req.file) {
        // La imagen se guarda en una carpeta 'uploads' dentro del servidor
        const imageUrl = `/uploads/${req.file.filename}`;

        try {
            // Crear la receta en la base de datos
            const newPrescription = await PrescriptionModel.create({
                user_id,
                image_url: imageUrl,  // Guardamos la URL de la imagen
                image_format: req.file.mimetype,  // Guardamos el formato de la imagen
                image_size: req.file.size,  // Guardamos el tamaño de la imagen
            });

            // Responder con el éxito de la creación
            res.status(201).json({
                message: "Receta creada correctamente.",
                prescription: newPrescription,
            });
        } catch (error) {
            console.error("Error al crear la receta:", error);
            res.status(500).json({ message: error.message });
        }
    } else {
        return res.status(400).json({ message: "No se ha subido ninguna imagen." });
    }
};*/
// Actualizar una receta existente
export const updatePrescription = async (req, res) => {
    try {
        const [updated] = await PrescriptionModel.update(req.body, {
            where: { prescription_id: req.params.id },
        });

        if (updated) {
            const updatedPrescription = await PrescriptionModel.findOne({
                where: { prescription_id: req.params.id },
            });
            res.status(200).json({
                message: "Receta actualizada",
                prescription: updatedPrescription,
            });
        } else {
            res.status(404).json({ message: "Receta no encontrada" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Eliminar una receta
export const deletePrescription = async (req, res) => {
    try {
        const deleted = await PrescriptionModel.destroy({
            where: { prescription_id: req.params.id },
        });

        if (deleted) {
            res.status(200).json({ message: "Receta eliminada" });
        } else {
            res.status(404).json({ message: "Receta no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//export { uploadImage };