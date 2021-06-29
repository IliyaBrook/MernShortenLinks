const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')


app.use(bodyParser.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})


const PORT = process.env.PORT || 5000

async function start() {
	mongoose.connection.on('connected', () => {
		console.log('Mongoose is connected!')
	})
	
	
	try {
		await mongoose.connect(
			process.env.MONGODB_URI || config.get('mongoUri')
			, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
			})
		
		app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
	} catch (e) {
		console.log('Server Error', e.message)
		process.exit(1)
	}
}

start().catch(e => console.log(e))