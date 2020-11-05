import React from 'react';
import { Route, Link } from "react-router-dom";
import Todo from './todo/todo';

class TodosList extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
          todosList:[],
        }
        this.ref = React.createRef();
      }

      componentDidMount(){
        fetch("/allTodos")
        .then(response=> response.json())
        .then(data=>{
          this.setState({
            todosList:data
          })
        })
        .catch(err=>{
          console.log(err);
        })
      }

      handleSubmit = (e)=> {
        e.preventDefault();
        // console.log(this.ref.current.value);
        let newName = this.ref.current.value.trim();
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
          console.log(data);
          let todosList = [...this.state.todosList];
          todosList.push(data);
          this.setState({
            todosList
          });
          this.ref.current.value="";
        })
        .catch(err=>{
          console.log(err);
        })
      }
      
      render(){
        return(
            <>

            <Route exact path={"/"}>
                <p>TODO LIST</p>
                <form onSubmit={this.handleSubmit}>
                    <input ref={this.ref} type="text" placeholder="addTodo"/>
                    <button type="submit">Submit</button>
                </form>

                {this.state.todosList.map((todoList)=>{
                    return <Link key={todoList._id} to={`/${todoList._id}`}> 
                                    <p>{todoList.name}</p>
                            </Link>
                })}

            </Route>

            <Route exact path={`/:id`} component={Todo} />
            </>
        )
      }
}

export default TodosList;