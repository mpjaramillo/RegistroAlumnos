const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Course = new Schema({
   name: {
      type: String
   },
   teacher: {
      type: String
   },
   area: {
      type: String
   },
   hours: {
      type: Number
   }
}, {
   collection: 'courses'
})

module.exports = mongoose.model('Course', Course)
