import express from 'express';
import multer from 'multer'; // multipart/form-data
import fs from 'fs';

const app = express();
const port = 4000;

const upload = multer({ dest: 'uploads/' });

app.post('/upload_image', upload.single('image'), (req, res) => {
	try {

		const { file: image } = req;

		if (image) {

			const newPath = `uploads/${image.originalname}`;
			fs.renameSync(image.path, newPath);

			console.log(`Imagen recibida y guardada como: ${newPath}`);

			res.status(200).send('Imagen recibida correctamente');
		} else {
			console.log('No se recibió ninguna imagen');
			res.status(400).send('No se recibió ninguna imagen');
		}
	} catch (error) {
		console.error('Error al procesar la imagen:', error);
		res.status(500).send('Error al procesar la imagen');
	}
});

app.listen(port, () => {
	console.log(`Servidor escuchando en http://localhost:${port}`);
});
