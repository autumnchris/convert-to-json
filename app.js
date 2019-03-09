const express = require('express');
const multer  = require('multer');
const csv = require('csvtojson');
const xml = require('xml2js').parseString;

const upload = multer().single('upfile');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.use(express.static(`${__dirname}/public`));

app.post('/api/convert', upload, (req, res) => {
  const file = req.file.buffer.toString('utf8');

  switch(req.file.mimetype) {
    case 'text/csv':
      return csv().fromString(file).then(json => {
        res.json(json);
      });
      break;
    case 'text/xml':
      return xml(file, {
        attrkey: 'attributes',
        charkey: 'text',
        trim: true,
        explicitArray: false
      }, (err, json) => {
        res.json(json);
      });
      break;
    default:
      res.json({
        error: 'File unable to be converted to JSON. Please upload a CSV file or a XML file instead.'
      })
  }
});

app.use((req, res) => {
  res.sendFile(`${__dirname}/views/404.html`, 404);
});

app.listen(port, console.log(`Server is listening at port ${port}.`));
