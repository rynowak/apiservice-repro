const express = require('express')
const https = require('https');
const fs = require('fs');
const path = require('path');
const morganBody = require("morgan-body")
const bodyParser = require("body-parser")

const app = express()
const port = process.env.PORT || 3000

// Log everything
app.use(bodyParser.json());
morganBody(app, {logAllReqHeader:true, maxBodyLength:5000});

app.get('*', (req, res) => {
  let result = {
      host: req.header("Host"),
      forwardedHost: req.header("X-Forwarded-Host")
  }
  res.status(200).send(result)
})

const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

https.createServer(options, app).listen(port, () => {
  console.log(`Demo API Service listening at http://localhost:${port}`)
})