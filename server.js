const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const Todos = require('./models/Todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// connection to mongoDB Cluster
require('./models/connection');
//TODOS
// let Todos = [
//     {_id:1,name:"one",todos:["go to work","hello boy","how are you","I'm fine"]},
//     {_id:2,name:"two",todos:["Eat food","Close the Door","go to market"]},
//     {_id:3,name:"three",todos:["i love chicken","eat an appple"]},
//     {_id:4,name:"four",todos:["i like the song","eat an orange"]}
// ];

//send all todosList's name and id
app.get("/allTodos",(req,res)=>{
    Todos.find({},(result)=>{
        res.status(200).json(result);
    });

});

app.post("/addTodos",(req,res)=>{

    //retrieving new TodoListName
    let name = req.body.name;
    console.log(name);
    Todos.create({name:name},(newTodoList)=>{
        res.status(201).json(newtTodoList);
    })
});

app.get("/seeTodos/:id",(req,res)=>{
    let data = Todos.find(todo=>{
        return todo._id==req.params.id;
    });
    res.json(data);
})

// add todo in given Todo list
app.post("/seeTodos/:id",(req,res)=>{
    let idx = Todos.findIndex(todo=>{
        return todo._id==req.params.id;
    });
    Todos[idx].todos.push(req.body.todo);
    res.json(Todos[idx]);
})

//production environment rules
if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT,(req,res)=>{
    console.log(`Server started at: ${PORT}`);
});
