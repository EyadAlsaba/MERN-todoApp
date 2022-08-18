const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  client_email: {
    type: String,
    required: true
  },
  client_lists: [Object]
});

const listSchema = new mongoose.Schema({
  clientId: String,
  list_title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  tasks: [Object]
});

const projectSchema = new mongoose.Schema({
  clientId: String,
  ownedBy: String,
  title: {
    type: String,
    trim: true,
    lowercase: true
  },
  note: { type: String, default: "" },
  date: { type: String, default: "" },
  priority: { type: String, default: "" },
  completed: { type: Boolean, default: false }
});

// Models
const ClientProfile = mongoose.models.ClientProfile || mongoose.model('ClientProfile', clientSchema);
const ClientLists = mongoose.models.ClientLists || mongoose.model('ClientLists', listSchema);
const ClientProject = mongoose.models.ClientProject || mongoose.model('ClientProject', projectSchema);


module.exports = { ClientProfile, ClientLists, ClientProject }

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