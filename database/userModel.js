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
    lowercase: true
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
  note: { type: String, default: " " },
  date: { type: String, default: " " },
  priority: { type: String, default: " " },
  completed: { type: Boolean, default: false }
});

// errors middleware handlers

/*
listSchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    console.log(error, doc)
    next(new Error('This title is exists,pls choose something different'));
  } else {
    next();
  }
});
*/

// Models
const ClientProfile = mongoose.models.ClientProfile || mongoose.model('ClientProfile', clientSchema);
const ClientLists = mongoose.models.ClientLists || mongoose.model('ClientLists', listSchema);
const ClientProject = mongoose.models.ClientProject || mongoose.model('ClientProject', projectSchema);


module.exports = { ClientProfile, ClientLists, ClientProject }

/*

  {
    "_id": "62ea27f0a43e7039eax5421",
    "client_email": "example@google.com",
    "client_lists": [
      {
        "clientId": "example@google.com",
        "list_title": "sample list",
        "tasks": [
          {
            "clientId": "example@google.com",
            "ownedBy":"sample list"
            "title": "example",
            "note": "",
            "date": "",
            "priority": "",
            "completed":false
          }
        ]
      }
    ]
  }
 ------------------------------
   const clientSchema = new mongoose.Schema({
    client_email: {
      type: String,
      required: true
    },
    client_lists: [{
      listId: new mongoose.Types.ObjectId,
      list_title: {
        type: String,
        required: true
      },
      tasks: [{
        title: { type: String, required: true, unique: true },
        note: String,
        date: String,
        priority: String,
        completed: Boolean
      }]
    }]
  });
*/