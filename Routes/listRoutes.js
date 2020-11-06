const express = require("express");
const router = express.Router();
const Todos = require('../Database/models/Todos');


//send all todosList's name and id
router.get("/allTodos",(req,res)=>{
    Todos.find({})
    .then(result=>{
        res.status(200).json(result);
    });
});

//add a new todo list
router.post("/addTodos",(req,res)=>{

    //retrieving new TodoListName
    Todos.create(req.body)
    .then(newTodoList=>{
        res.status(201).json(newTodoList);
    })
});

// delete a todo List
router.delete("/deleteList/:id",(req,res)=>{
    let id = req.params.id;
    Todos.findByIdAndDelete({_id:id})
    .then(()=>{
        res.status(200).json({});
    })
});

//edit a todo List name
router.put("/editList/:id",(req,res)=>{
    let id = req.params.id;
    let newName = req.body.name;
    Todos.findByIdAndUpdate(id,{name : newName},{useFindAndModify: false},(err,x)=>{
        if(err){
            console.log("Error " + err)}
        else
        res.status(204).json(null);
    });
})

//see a particular todo list
router.get("/allTodos/:id",(req,res)=>{
    Todos.findById(req.params.id)
    .then(todo=>{
        res.status(200).json(todo);
    });
})

module.exports = router;
