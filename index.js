const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const postRoutes = require('./routes/posts')

const app = express()
dotenv.config()

app.use(bodyParser.json({
  limit: "30mb",
  extended: true
}))
app.use(bodyParser.urlencoded({
  limit: "30mb",
  extended: true
}))
app.use(cors())

app.use('/posts', postRoutes)

const PORT = process.env.PORT || 5003

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)