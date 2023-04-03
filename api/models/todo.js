const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoSchema = new Schema({
    text: {
        type: String,
        required: false
    },
    completed: {    
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Todo = mongoose.model('todos', TodoSchema, 'todos');

