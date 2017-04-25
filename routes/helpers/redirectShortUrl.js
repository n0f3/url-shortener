const UrlInfo = require('../../schema/UrlInfo');

module.exports = (req, res) => {
  const requestedShortUrl = req.params.shortUrl;
  const fullShortUrl = `${req.hostname}/${requestedShortUrl}`;
  UrlInfo.findOne({short_url: fullShortUrl}, (err, url) => {
    if(err) throw err;
    if(!url) {
      res.status(400).send('Something went wrong, unable to find short url');
    }
    const redirectUrl = url.original_url;
    console.log(redirectUrl);
    res.redirect(redirectUrl);
  });
};