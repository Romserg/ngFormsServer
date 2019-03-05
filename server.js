const http = require('http');
const formidable = require('formidable');
const util = require('util');

const server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type', 'Access-Control-Request-Method', 'Access-Control-Request-Headers');

  if(req.method.toLowerCase() === 'post') {
    processForm(req, res);
    return;
  }

  if(req.method.toLowerCase() === 'get') {
    let data = {
      data: {
        languages: [
          'English',
          'Spanish',
          'German',
          'Other'
        ]
      }
    };

    let responseData = JSON.stringify(data);
    res.end(responseData);
    console.log('get: ', responseData);
    return
  }

  res.end();
});

function processForm(req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields) {
    res.writeHead(200, {
      'content-type': 'text/plain'
    });

    let data = JSON.stringify({
      fields: fields
    });
    res.end(data);

    console.log('posted fields:\n');
    console.log(data)
  });
}

const port = 3100;
server.listen(port);
console.log('server listening on port ' + port);