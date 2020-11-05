import React from 'react';


class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            todos:[],
            id: props.match.params.id,
            name: "",
        };
        this.ref= React.createRef()
    }
    componentDidMount = ()=>{
        fetch(`/seeTodos/${this.state.id}`)
        .then((res)=>res.json())
        .then(data=>{
            this.setState({
                name: data.name,
                todos: data.todos
            })
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        let newTodo = this.ref.current.value.trim();
        if(!newTodo)return;
        fetch(`/seeTodos/${this.state.id}`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({todo:newTodo})
          })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                todos:data.todos
            });
            this.ref.current.value = "";
        })
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input ref={this.ref} type="text"/>
                    <button type="submit">Submit</button>
                </form>
                {
                this.state.todos
                ?
                    this.state.todos.map((todo,idx)=>{
                        return <div key={idx}>{todo}</div>
                    })
                :
                    null
                }
            </div>
        )
        
    }
}

export default Todo;