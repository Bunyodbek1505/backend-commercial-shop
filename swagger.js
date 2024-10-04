import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Mini Market',
			version: '1.0.0',
			description: 'API documentation',
		},
		servers: [
			{
				url: 'http://localhost:8080',
			},
		],
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
		tags: [
			{
				name: 'Users',
				description: 'User management',
			},
			{
				name: 'Admin',
				description: 'Admin management',
			},
			{
				name: 'Categories',
				description: 'Category management',
			},
			{
				name: 'Products',
				description: 'Product management',
			},
			{
				name: 'Comments',
				description: 'Comment management',
			},
		],
	},
	apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJsDoc(options)

const swaggerDocs = (app, port) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
	console.log(`Swagger docs available at http://localhost:${port}/api-docs`)
}

export default swaggerDocs
