const express = require('express')
var fs = require('fs');

const app = express()
const port = 3481;

var sensorData = {
  "rain": []
};

var fileName = "data.json";

function writeData() {
  var dString = JSON.stringify(sensorData);

  fs.writeFile(fileName, dString, function(err) {
      if(err) {
          return console.log(err);
      }
  });
}

function loadData() {
  fs.readFile(fileName, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    if (data) {
      var jsonData = JSON.parse(data);
      if ("rain" in jsonData) {
        sensorData = jsonData;
      } else {
        console.log("malformed data, ignoring");
      }
    }
  });
}

app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.get('/data', (request, response) => {
  var dString = JSON.stringify(sensorData);
  response.send(dString);
})

app.get('/rain', (request, response) => {
  response.send('Recorded message');
  console.log("response received");

  //store
  var t = Date.now();
  sensorData.rain.push(t);

  writeData();

})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

loadData();
