const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet');
const path = require('path');
const mongoLabUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/url-shortener';
const router = require('./routes/router');


mongoose.connect(mongoLabUrl);
mongoose.Promise = global.Promise;

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));