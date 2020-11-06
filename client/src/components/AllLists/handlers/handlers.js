
    var  x = {
    handleSubmit : (e,cls)=> {

        e.preventDefault();
        // console.log(this.ref.current.value);
        let newName = cls.ref.current.value.trim();
        if(!newName)return;
        
        fetch("/addTodos",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:newName})
        })
        .then(res => res.json())
        .then(data=>{
            let todosList = [...cls.state.todosList];
            todosList.push(data);
            cls.setState({
                todosList
            });
            cls.ref.current.value="";
        })
        .catch(err=>{
            console.log(err);
        })
    },
    
    handleDelete : (id,cls)=>{
        fetch(`/deleteList/${id}`,{
            method: 'DELETE',
            headers: { 
                'Content-type': 'application/json'
            }
        })
        .then(res=>{
            if(res.status===200){
                let todosList = cls.state.todosList;
                let i = todosList.findIndex((list)=>{
                    return list._id===id;
                });
                todosList.splice(i,1);
                cls.setState({
                    todosList
                })
            }
        })
    },
    
    handleOpen : (id,cls)=>{
        cls.setState({
            openModal:true,
            current_id:id
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
        let newName = cls.ref2.current.value.trim();
        if(!newName)return;
        
        fetch(`/editList/${cls.state.current_id}`,{
            method: "PUT",
            headers:{ 
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name:newName})
        })
        .then(res=>{
            if(res.status===204){
                let todosList = cls.state.todosList;
                let i = todosList.findIndex((list)=>{
                    return list._id===cls.state.current_id;
                });
                todosList[i].name = newName;
                cls.setState({
                    todosList
                })
                cls.handleClose();
            }
        })
    }
}
export default x;