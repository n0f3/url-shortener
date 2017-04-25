const urlvalidator = require('../../modules/UrlValidator');
const UrlInfo = require('../../schema/UrlInfo');

module.exports = (req, res) => {
  if(!req.params || !urlvalidator(req.params[0])) {
    res.status(400).send(JSON.stringify({error: 'Invalid URL detected. Please enter a valid URL.'}));
  }
  const urlParam = req.params[0];
  if(urlvalidator(urlParam)) {
    UrlInfo.find({original_url: urlParam}, (err, urls) => {
      if(err) throw err;
      if(!urls || urls.length < 1) {
        res.status(400).send(`No short url entries with original url: ${urlParam} are currently stored!`);
      } else {
        urls.forEach((url) => {
        url.remove((err) => {
          if(err) throw err;
          console.log('url deleted');
          });
        });
        res.send(`Deleted all entries containing url: ${urlParam}`);
      }
    });
  }
};