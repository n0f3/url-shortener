const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let urlSchema = new Schema({
  original_url: { type: String, default: '' },
  short_url: { type: String, default: '' }
});

const generateRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

urlSchema.methods.shortify = function(original_url, base_url) {
  this.original_url = original_url;
  this.short_url = `${base_url}/${generateRandom(1000, 9999)}`;
};

if (!urlSchema.options.toObject) urlSchema.options.toObject = {};
urlSchema.options.toObject.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret._id;
  return ret;
}

const UrlInfo = mongoose.model('UrlInfo', urlSchema);

module.exports = UrlInfo;