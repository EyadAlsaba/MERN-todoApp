const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  client_email: {
    type: String,
    required: true,
    unique: true
  },
  client_lists: [Object]
});

// for adding new list into client lists
const listSchema = new mongoose.Schema({
  list_title: {
    type: String,
    required: true,
    unique: true
  },
  tasks: [Object]
});

const ClientProfile = mongoose.models.ClientProfile || mongoose.model('ClientProfile', clientSchema);
const ClientProject = mongoose.models.ClientProject || mongoose.model('ClientProject', listSchema);

module.exports = { ClientProfile, ClientProject }

/*

[
  {
    client_id: session[user_id],
    client_email: session[user_email],
    client_lists:[
      { 
        list_title:`sample A`,
        tasks:[{
          title: `test`,
          note: `study || default empty string`,
          date: `2022-08-31 || default empty string`,
          priority: `(low-med-high) || default empty string`
        }]
      }
    ]
  }
]

  {
    "client_id":"62e42c83d052af6279e48949",
    "client_email":"elias.saab.90@gmail.com",
    "client_lists": [{}]
  }

*/