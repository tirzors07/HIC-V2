import PrescriptionModel from "../models/PrescriptionModel.js";

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
export const createPrescription = async (req, res) => {
    const { user_id, image_url, image_format, image_size } = req.body;

    try {
        // Validar que los datos necesarios estén presentes
        if (!user_id || !image_url || !image_format || !image_size) {
            return res.status(400).json({ message: "Faltan campos requeridos." });
        }

        // Validar formato de la imagen
        const validFormats = ['JPEG', 'PNG', 'JPG'];
        if (!validFormats.includes(image_format)) {
            return res.status(400).json({ message: "Formato de imagen no válido." });
        }

        // Crear una nueva receta
        const newPrescription = await PrescriptionModel.create({
            user_id,
            image_url,
            image_format,
            image_size,
        });

        res.status(201).json({
            message: "Receta creada",
            prescription: newPrescription,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
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
