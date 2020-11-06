import React from 'react';
import { Route, Link } from "react-router-dom";
import Todo from '../todos/todos';
import classes from './AllLists.module.css';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Handlers from "./handlers/handlers";

class AllLists extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
          todosList:[],
          openModal:false,
          current_id: ""
        }
        this.ref = React.createRef();
        this.ref2 = React.createRef();
      }

      componentDidMount(){
        fetch("/allTodos")
        .then(response=> response.json())
        .then(data=>{
          let todosList = data;
          if(todosList){
            this.setState({
              todosList
            })
          }
        })
        .catch(err=>{
          console.log(err);
        })
      }

      handleSubmit = (e) => Handlers.handleSubmit(e,this)
      handleDelete = (id) => Handlers.handleDelete(id,this)
      handleOpen = (id) => Handlers.handleOpen(id,this)
      handleClose = () => Handlers.handleClose(this)
      handleSubmit2 = (e) => Handlers.handleSubmit2(e,this)
      
      render(){
        return(
            <>

            <Route exact path={"/"}>
              <div className={classes.container}>
                <p className={classes.header}><strong>TODO</strong> LISTS</p>
                <form className={classes.form} onSubmit={e=>this.handleSubmit(e)}>
                    <TextField className={classes.input} variant="filled" inputRef={this.ref} type="text" label="add new List"/>
                    {/* <Button className={classes.button} variant="contained" color="primary" type="submit"></Button> */}
                </form>

                <div className={classes.list}>{
                      this.state.todosList?
                      this.state.todosList.map((todoList)=>{
                          return <div key={todoList._id} className={classes.todoList} >
                                    <div className={classes.list}><Link className={classes.link} to={`/${todoList._id}`}> 
                                        {todoList.name}
                                    </Link></div>
                                    <div onClick={()=>this.handleDelete(todoList._id)} className={classes.delete}><i className="fa fa-trash"></i></div>
                                    <div onClick={()=>this.handleOpen(todoList._id)} className={classes.edit} ><i className="fa fa-pencil" aria-hidden="true"></i></div>
                                  </div>
                      }).reverse():null}
                </div>
                <div>
                  <Modal className={classes.modal} open={this.state.openModal} onClose={this.handleClose}>
                    <Paper className={classes.paper}>
                      <form onSubmit={this.handleSubmit2}>
                        <TextField inputRef={this.ref2} autoFocus label="new name"/>
                      </form>
                    </Paper>
                  </Modal>
                </div>
              </div>
            </Route>

            <Route exact path={`/:id`} component={Todo} />

            </>
        )
      }
}

export default AllLists;