const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

//CORS
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function handleTest() {
  return ('testfunc')
}

let token = null
let comicObject = null

app.get('/GetData/:token/:comicObject', (req, res) => {

  token = req.params.token
  comicObject = req.params.comicObject

  res.send('Data received')
})

app.get(`/Token/:dynamicToken`, (req, res) => {
  const dynamicToken = req.params.dynamicToken

  if (dynamicToken === token) {
    res.send('Show Data')
    console.log(dynamicToken)
    console.log(comicObject)
    //Reset
    token = null
    comicObject = null
  } else {
    res.status(404).send('Token not found')
  } 

})

app.get('/test', (req, res) => {
  res.send(token)
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})