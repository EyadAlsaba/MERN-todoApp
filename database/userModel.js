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

//mongoose.set('debug', true);

module.exports = { ClientProfile }
