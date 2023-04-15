const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  creator: {
    _id: { type: Types.ObjectId, ref: "User", required: true },
    login: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  title: { type: String, required: true },
  priority: { type: String, required: true },
  deadline: { type: String, required: true },
  status: { type: String, required: true },
  checked: { type: Boolean, required: true },
  readedBy: [{ type: Types.ObjectId, ref: "User" }],
  users: [
    {
      type: Object,
      _id: { type: Types.ObjectId, ref: "User" },
      login: String,
      avatar: String,
    },
  ],
  text: String,
});

module.exports = model("Task", schema);

// const subSchema = new Schema({
//     _id: {type: Types.ObjectId, ref: 'User'},
//     login: String,
//     avatar: String
// });

// const taskSchema = new Schema({
//     creator: {
//         _id :  {type: Types.ObjectId, ref: 'User', required: true},
//         login: {type: String, required: true},
//         avatar: {type: String, required: true}
//     },
//     title: {type: String, required: true},
//     priority: {type: String, required: true},
//     deadline: {type: String, required: true},
//     status: {type: String, required: true},
//     checked: {type: Boolean, required: true},
//     users: [subSchema],
//     text: String
// });

// module.exports = model('Task', taskSchema);
