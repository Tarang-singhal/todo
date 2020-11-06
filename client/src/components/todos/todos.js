import React from 'react';
import classes from './todos.module.css';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Handlers from './handlers/handlers';
class Todos extends React.Component{
    constructor(props){
        super(props);
        this.state={
            todos:[],
            id: props.match.params.id,
            name: "",
            openModal:false,
            current_id:null
        };
        this.ref= React.createRef()
        this.ref2= React.createRef()
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

    handleSubmit = (e)=> Handlers.handleSubmit(e,this);
    handleDelete = (id,idx,cls)=> Handlers.handleDelete(id,idx,this);
    handleOpen = (id)=> Handlers.handleOpen(id,this);
    handleClose = ()=> Handlers.handleClose(this);
    handleSubmit2 = (e)=> Handlers.handleSubmit2(e,this);

    render(){
        return (
            <div className={classes.container}>
                <p className={classes.header}><strong>{this.state.name}'s</strong> LIST</p>
                <form onSubmit={this.handleSubmit}>
                <TextField className={classes.input} variant="filled" inputRef={this.ref} type="text" label="add new TODO"/>
                </form>
                {
                this.state.todos
                ?
                    this.state.todos.reverse().map((todo,idx)=>{
                        return (
                        <div className={classes.todoList} key={idx}>
                            <div className={classes.list}> 
                                <div className={classes.link}>{todo}</div>
                            </div>
                            <div onClick={()=>this.handleDelete(this.state.id,idx)} className={classes.delete}><i className="fa fa-trash"></i></div>
                            <div onClick={()=>this.handleOpen(idx)} className={classes.edit}><i className="fa fa-pencil" aria-hidden="true"></i></div>
                        </div>
                        )
                    })
                :
                    null
                }
                <div>
                  <Modal className={classes.modal} open={this.state.openModal} onClose={this.handleClose}>
                    <Paper className={classes.paper}>
                      <form onSubmit={this.handleSubmit2}>
                        <TextField inputRef={this.ref2} autoFocus label="edit Todo name"/>
                      </form>
                    </Paper>
                  </Modal>
                </div>
            </div>
        )
        
    }
}

export default Todos;