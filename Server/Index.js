const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = 8080

//CORS
app.use(cors())
//Body parser
app.use(bodyParser.json())

let userData = {}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let token = null
let foldersObject = null

app.post('/GetData/:token', (req, res) => {

  token = req.params.token
  foldersObject = req.body

  //Add Data property and store the folderObject inside
  userData[token] = {
    data: foldersObject,
  }

  res.send('Data received')
  console.log('(EXPORT) Data received:')
  console.log(`Token: ${token}`)
  console.log(foldersObject)

  //Timer to delete the token after 5 minutes
  setTimeout(() => {
    delete userData[token]
    console.log(`Token ${token} has been removed from the pool`)
  }, 60000);
})

app.get(`/Token/:dynamicToken`, (req, res) => {
  const dynamicToken = req.params.dynamicToken

  if (userData.hasOwnProperty(dynamicToken)) {
    //Update user data (the folders)
    const userFolders = userData[dynamicToken].data
    res.json(userFolders)
    console.log('(IMPORT) Data received:')
    console.log(`Token: ${token}`)
    console.log(userFolders)

  } else {
    res.status(404).send('Token not found')
  } 

})

app.get('/test', (req, res) => {
  res.json(Object.keys(userData))
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})