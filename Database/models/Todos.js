var mongoose = require('mongoose');

var todosSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    todos:[String]
})

module.exports = mongoose.model("todos",todosSchema);