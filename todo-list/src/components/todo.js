import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
const Todo = (props) => {
    return <tr>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.description}</td>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.responsible}</td>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.priority}</td>
        <td>
            <Link to={'/edit/' + props.todo._id}>Edit</Link>
        </td>
    </tr>;
}

export default Todo;