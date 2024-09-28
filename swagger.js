import { createRequire } from 'module' 
import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express' 

// package.json ni to'g'ri yuklash
const require = createRequire(import.meta.url)
const { version } = require(path.resolve('package.json')) 

// Swagger definition
const options = {
	definition: {
		openapi: '3.1.0',
		info: {
			title: 'Rest API Docs',
			version, // Versiyani package.json dan olamiz
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ['./routes/*.js', './controllers/*.js'],
}

// Swagger specificationni generatsiya qilish
const swaggerSpec = swaggerJSDoc(options)

// Swagger hujjatlarining funksiyasi
function swaggerDocs(app, port) {
	// api-docs marshrutida Swagger UI ni qo'shish
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

	// JSON formatdagi hujjatlar
	app.get('/api-docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json')
		res.send(swaggerSpec)
	})

	console.log(`Swagger hujjatlar: http://localhost:${port}/api-docs manzilda mavjud`)
}

export default swaggerDocs
