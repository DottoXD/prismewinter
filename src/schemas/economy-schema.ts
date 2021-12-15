const mongoose = require('mongoose');

export let Schema = new mongoose.Schema({
  id: String,
  snowballs: Number,
  snowflakes: Number,
  snowmans: Number
});

module.exports = mongoose.model('balance', Schema);
