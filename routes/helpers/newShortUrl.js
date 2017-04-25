const urlvalidator = require('../../modules/UrlValidator');
const UrlInfo = require('../../schema/UrlInfo');

module.exports = (req, res) => {
  if(!req.params || !urlvalidator(req.params[0])) {
    res.status(400).send(JSON.stringify({error: 'Invalid URL detected. Please enter a valid URL.'}));
  }
  const urlParam = req.params[0];
  if(urlvalidator(urlParam)) {
    const urlInfo = new UrlInfo();
    urlInfo.shortify(urlParam, req.hostname);
    urlInfo.save((err) => {
      if(err) throw err;
      console.log('urlInfo: ' + urlParam + 'created');
    });
    res.send(JSON.stringify(urlInfo.toObject()));
  }
};