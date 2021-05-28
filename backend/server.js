const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors= require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
let model = require('./todo.model');

const PORT = 4000;

mongoose.connect("mongodb://localhost/todos",{useNewUrlParser: true ,useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('connection to db made successfully');
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// first route ../todos/
todoRoutes.route('/').get((req, res)=>{
    model.find({}, (err, todo)=>{
        if (err){
            console.log('some error');
        }else{
            res.json(todo);
        }
    })
});

todoRoutes.route('/:id').get((req, res)=>{
    let id = req.params.id;
    model.findById(id, (err, todo)=>{
        if(err) console.log(err);
        else
        res.json(todo);
    });
});

todoRoutes.route('/add').post((req, res)=>{
    let todo = new model(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added succesfully'});
        })
        .catch(err => {
            res.status(400).send('adding new task failed');
        });
});

//update the todo
todoRoutes.route('/update/:id').post((req, res)=>{
    model.findById(req.params.id, (err, todo)=>{
        if(err)
            res.status(400).send('data is not found');
        else {
            todo.description = req.body.description;
            todo.responsible = req.body.responsible;
            todo.priority = req.body.priority;
            todo.completed = req.body.completed;

            todo.save().then(todo => {
                res.json({'todo': 'todo upadted'});
            }).catch(err => {
                res.status(400).send('no updates made');
            });
        }
    });
});



app.use('/todos', todoRoutes); // all the routes make use of this prefix

app.listen(process.env.port || PORT, ()=>{
    console.log('running');
})