
var x = {
    handleSubmit : (e,cls)=>{
        e.preventDefault();
        let newTodo = cls.ref.current.value.trim();
        if(!newTodo)return;
        fetch(`/seeTodos/${cls.state.id}`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({todo:newTodo})
          })
        .then(res=>res.json())
        .then(data=>{
            cls.setState({
                todos:data.todos
            });
            cls.ref.current.value = null;
        })
    },

    handleDelete : (id,idx,cls)=>{
        fetch(`/deleteTodo/${id}/${idx}`,{
          method: 'DELETE',
            headers: { 
                'Content-type': 'application/json'
            }
        })
        .then(res=>{
          if(res.status===200){
            let todos = cls.state.todos;
            todos.splice(idx,1);
            cls.setState({
                todos
            })
          }
        })
      },

    handleOpen : (id,cls)=>{
        cls.setState({
            openModal: true,
            current_id: cls.state.todos.length-id-1
        })
    },
    
    handleClose : (cls)=>{
        cls.setState({
            openModal:false,
            current_id:""
        })
    },

    handleSubmit2 : (e,cls)=>{
        e.preventDefault();
        let newTodo = cls.ref2.current.value.trim();
        if(!newTodo)return;

        fetch(`/editTodo/${cls.state.id}/${cls.state.current_id}`,{
            method: "PUT",
            headers:{ 
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name:newTodo})
        })
        .then(res=>{
            console.log(res);
            if(res.status===204){
                let todos = [...cls.state.todos];
                todos[cls.state.current_id] = newTodo;
                cls.setState({
                todos
                })
                cls.handleClose();
            }
        })
    }
}

export default x;