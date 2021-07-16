const csv = require('csvtojson');
const xml = require('xml2js').parseString;

exports.convertToJSON = (req, res, next) => {
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
      res.send('File unable to be converted to JSON. Please upload a CSV file or XML file instead.');
  }
}
