import React, {Component} from 'react';
import Todo from './todo'
import axios from 'axios';

export default class TodosList extends Component {

    constructor(props){
        super(props);
        this.state = {todos: []}
    }

    componentDidMount(){
        axios.get('http://localhost:4000/todos').then(res => {
            this.setState({todos: res.data});
        })
        .catch(err => console.log(err));
    } 

    componentDidUpdate(){
        this.componentDidMount();
    }
    render(){
        return <div>
            <p>Todo lsit</p>
            <table className="table table-striped mt-5">
                <thead>
                    <tr>
                        <th>Descroption</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.todoList()}
                </tbody>
            </table>
        </div>
    }

    todoList(){
        return this.state.todos.map((todo, i) => {
            return <Todo todo={todo} key ={i}/>
        })
    }
    
   
}