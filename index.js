import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url) // Ruta completa
const __dirname = dirname(__filename) // Directorio

const app = express()
const PORT = process.env.PORT || 3000

app.use(fileUpload())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.raw({ type: 'image/jpeg', limit: '10mb' })) // Para recibir imágenes en formato raw

const UPLOAD_FOLDER = 'uploads'
const uploadDir = path.join(__dirname, UPLOAD_FOLDER)
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir)
}

app.post('/upload', (req, res) => {
	console.log(req.files)
	if (!req.files || !req.files.image) {
		return res.status(400).json({ error: 'No se recibió ninguna imagen' })
	}

	const imageFile = req.files.image

	// Generar un nombre único para la imagen
	const imageName = Date.now() + path.extname(req.files.image.name)
	const imagePath = path.join(uploadDir, imageName)

	// Guardar imagen
	imageFile.mv(imagePath, (err) => {
		if (err) {
			console.error('Error al guardar la imagen:', err)
			return res.status(500).json({ error: 'Error interno del servidor' })
		}
		console.log('Imagen guardada:', imageName)
		res.status(200).json({
			message: 'Imagen recibida y guardada correctamente',
			filename: imageName,
		})
	})
})

app.listen(PORT, () => {
	console.log(`Servidor Express corriendo en el puerto ${PORT}`)
})
