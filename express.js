//Install express server
const express = require('express');

const path = require('path');

// const app = express();
// global.app = express();

// Serve only the static files form the dist directory



// Start the app by listening on the default Heroku port
// app.listen(8000);
module.exports = () => {
  global.app.use(express.static(__dirname + '/dist/'));

 

  global.app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });


}
