import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar la carga de archivos
app.use(fileUpload());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

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
