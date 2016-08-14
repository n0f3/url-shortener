var express = require('express');
var mongoose = require('mongoose');
var UrlInfo = require('./schema/UrlInfo');
var urlvalidator = require('./modules/UrlValidator');
var app = express();

const mongoLabUrl = process.env.MONGOLAB_URI;
mongoose.connect(mongoLabUrl);

app.set('port', process.env.PORT || 8080);
app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/:shortUrl', (req, res) => {
  const requestedShortUrl = req.params.shortUrl;
  const fullShortUrl = `https://${req.hostname}/${requestedShortUrl}`;
  UrlInfo.findOne({short_url: fullShortUrl}, (err, url) => {
    if(err) throw err;
    if(!url) {
      return res.send('Something went wrong, unable to find short url');
    }
    const redirectUrl = url.original_url;
    return res.redirect(redirectUrl);
  });
});

app.get('/new/*', (req, res) => {
  const urlParam = req.params[0];
  if(urlvalidator(urlParam)) {
    const urlInfo = new UrlInfo();
    urlInfo.shortify(urlParam, req.hostname);
    urlInfo.save((err) => {
      if(err) throw err;
      console.log('urlInfo created');
    });
    return res.send(JSON.stringify(urlInfo.toObject()));
  }
  return res.send(JSON.stringify({error: 'Invalid URL detected. Please enter a valid URL.'}));
});

app.get('/deleteall/*', (req, res) => {
  const urlParam = req.params[0];
  if(urlvalidator(urlParam)) {
    UrlInfo.find({original_url: urlParam}, (err, urls) => {
      if(err) throw err;
      if(!urls || urls.length < 1) {
        res.send(`No short url entries with original url: ${urlParam} are currently stored!`);
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
});

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));