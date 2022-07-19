const express = require('express')
const shell = require('shelljs');
const app = express()
const cors = require('cors');
const port = 3000

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/homepage', function(req,res){
  var result = shell.exec('./hi.sh');
  result = result.stdout.slice(1, -2);
  console.log(result);
  res.header("Access-Control-Allow-Origin", "homepage.html:1");
  res.send(result);
})

app.get('/finedust', function (req, res) {
  

})
app.get('/forecast', function(req,res) {

})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))