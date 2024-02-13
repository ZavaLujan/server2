import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar la carga de archivos
app.use(fileUpload());

const UPLOAD_FOLDER = 'uploads';
const uploadDir = path.join(__dirname, UPLOAD_FOLDER);
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.post('/upload', (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ error: 'No se recibió ninguna imagen' });
    }

    const imageFile = req.files.image;

    // Guardar la imagen en el servidor
    const filename = path.join(uploadDir, imageFile.name);
    imageFile.mv(filename, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al guardar la imagen' });
        }
        res.status(200).json({ message: 'Imagen recibida y guardada correctamente', filename: filename });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
