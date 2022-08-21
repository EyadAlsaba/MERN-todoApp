const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  client_email: {
    type: String,
    required: true
  },
  client_lists: [{
    list_title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    tasks: [{
      title: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
      },
      note: { type: String, default: "" },
      date: { type: String, default: "" },
      priority: { type: String, default: "" },
      completed: { type: Boolean, default: false }
    }]
  }]
});
//{ optimisticConcurrency: true }
// Models
const ClientProfile = mongoose.models.ClientProfile || mongoose.model('ClientProfile', clientSchema);


module.exports = { ClientProfile }

/*

* errors middleware handlers
  listSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
      console.log(error, doc)
      next(new Error('This title is exists,pls choose something different'));
    } else {
      next();
    }
  });

*/