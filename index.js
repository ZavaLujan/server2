// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import fileUpload from 'express-fileupload';
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
// import fs from 'fs';

// const __filename = fileURLToPath(import.meta.url); // C:\Users\GBP17\Desktop\server2\index.js
// const __dirname = path.dirname(__filename); // C:\Users\GBP17\Desktop\server2

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware para manejar la carga de archivos
// app.use(fileUpload());
// app.use(cors());
// app.use(helmet());
// app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.raw({ type: 'image/jpeg', limit: '10mb' }));

// const UPLOAD_FOLDER = 'uploads';
// const uploadDir = path.join(__dirname, UPLOAD_FOLDER);
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// app.post('/upload', (req, res) => {
//     // Generar un nombre único para la imagen
//     const imageName = Date.now() + '.jpg';
//     const imagePath = dirname + imageName;

//     // Guardar la imagen en el servidor
//     fs.writeFile(imagePath, req.body, 'binary', (err) => {
//         if (err) {
//             console.error('Error al guardar la imagen:', err);
//             res.status(500).send('Error interno del servidor');
//         } else {
//             console.log('Imagen guardada:', imageName);
//             res.status(200).send('Imagen recibida correctamente');
//         }
//     });
// });

// // app.post('/upload', (req, res) => {
// //     if (!req.files || !req.files.image) {
// //         return res.status(400).json({ error: 'No se recibió ninguna imagen' });
// //     }

// //     const imageFile = req.files.image;

// //     // Guardar la imagen en el servidor
// //     const filename = path.join(uploadDir, imageFile.name);
// //     imageFile.mv(filename, (err) => {
// //         if (err) {
// //             return res.status(500).json({ error: 'Error al guardar la imagen' });
// //         }
// //         res.status(200).json({ message: 'Imagen recibida y guardada correctamente', filename: filename });
// //     });
// // });

// app.listen(PORT, () => {
//     console.log(`Servidor Express corriendo en el puerto ${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url); // Ruta completa del archivo actual
const __dirname = dirname(__filename); // Directorio del archivo actual

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar la carga de archivos
app.use(fileUpload());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.raw({ type: 'image/jpeg', limit: '10mb' }));

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

    // Generar un nombre único para la imagen
    const imageName = Date.now() + '.jpg';
    const imagePath = path.join(uploadDir, imageName);

    // Guardar la imagen en el servidor
    imageFile.mv(imagePath, (err) => {
        if (err) {
            console.error('Error al guardar la imagen:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        console.log('Imagen guardada:', imageName);
        res.status(200).json({ message: 'Imagen recibida y guardada correctamente', filename: imageName });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
