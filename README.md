# URL shortener microservice

Express based microservice that allows you to pass in a URL as parameter and return a shortened URL in the json response that you can use to redirect to original link. The API endpoint for the GET request is `/new/:url`
The response json of 
```
{
  "short_url": "short_url_link",
  "original_url": "original_url_link"
}
```
You can then send a GET request or use the short_url directly and you will be redirected to the original url. It's also possible to delete all existing short_url links for a particular URL by sending a GET request to `/deleteall/:url`

## [Live Demo](https://urlshortly.herokuapp.com/)

## Project structure
```
.
├── modules
│   └── UrlValidator.js
├── mongod
├── package.json
├── Procfile
├── public
│   └── javascript
│       └── index.js
├── README.md
├── routes
│   ├── helpers
│   │   ├── deleteAllShortUrl.js
│   │   ├── home.js
│   │   ├── newShortUrl.js
│   │   └── redirectShortUrl.js
│   └── router.js
├── schema
│   └── UrlInfo.js
├── server.js
└── views
    └── index.pug


```