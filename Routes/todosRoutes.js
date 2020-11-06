const express = require("express");
const router = express.Router();
const Todos = require('../Database/models/Todos');


// add todo in particular Todo list
router.post("/seeTodos/:id",(req,res)=>{
    Todos.findById(req.params.id)
    .then(todoList=>{
        todoList.todos.push(req.body.todo);
        todoList.save()
        .then((todo)=>{
            res.json(todo);
        })
    });
})

//delete a particular todo
router.delete("/deleteTodo/:id/:idx",(req,res)=>{
    let id = req.params.id;
    let idx = req.params.idx;
    Todos.findOne({_id:id})
    .then((list)=>{
        list.todos.splice(idx,1);
        list.save();
    })
    res.status(200).json(null);
})

//edit a particular todo
router.put("/editTodo/:id/:idx",(req,res)=>{
    let id = req.params.id;
    let idx = req.params.idx;
    let newName = req.body.name;
    Todos.findOne({_id:id})
    .then((list)=>{
        list.todos[idx] = newName;
        Todos.findByIdAndUpdate(id,{todos:list.todos},{useFindAndModify: false},(err,x)=>{
            if(err){
                console.log("Error " + err)}
            else
            res.status(204).json(null);
        });
    })
})


module.exports = router;