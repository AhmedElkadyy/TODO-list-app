const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// models
const todo = require('./models/todo');



//set up express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://kady:AaBbCc112233@cluster0.xuc2vpg.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}
).catch((err) => {
    console.log(err);

}
);


app.listen(3000, () => {
    console.log('Server started on port 3000');
}
);

//apis
app.get('/todos', (req, res) => {
    todo.find()
        .then((todos) => {
            res.json(todos);
        })
        .catch((err) => {
            console.log(err);
        })
}
);

app.post('/todos/new', (req, res) => {
    const newTodo = new todo({
        text: req.body.text,
        completed: req.body.completed,
    });
    newTodo.save()
        .then((todo) => {
            res.json(todo);

            console.log(todo);
        })
        .catch((err) => {
            console.log(err);
        })
}
);

app.delete('/todos/delete/:id', (req, res) => {
    todo.findByIdAndDelete(req.params.id)
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            console.log(err);
        })
} );

app.put('/todos/update/:id', (req, res) => {

    todo.findByIdAndUpdate(req.params.id, {
        text: req.body.text,
        completed: req.body.completed,
    })
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            console.log(err);
        })
}
);

app.get('/todos/completed/:id', async (req, res) => {

    try {
        const Todo = await todo.findById(req.params.id);
        Todo.completed = !Todo.completed;
        const updatedTodo = await Todo.save();
        res.json(updatedTodo);
    } catch (err) {
        console.log(err);
    }
}
);