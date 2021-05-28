import React, {useState} from 'react';
const axios = require('axios');

const CreateTodo = () => {
    const [description, setdescription] = useState('');
    const [responsible, setresponsible] = useState('');
    const [priority, setpriority] = useState('');
    const [completed, setcompleted] = useState(false);

    function _clearData(){
        setdescription('');
        setresponsible('');
        setpriority('');
        setcompleted(false);
    }

    return(
        <div style={{marginTop:20}}>
        <h2>Create a new Todo List</h2>
        <form>
            <div className="form-group mt-2"><input className="form-control"  type="text" placeholder="Description" value={description} onChange={(e)=> setdescription(e.target.value)}/></div>
            <div className="form-group mt-2"><input className="form-control" type="text" placeholder="Responsible" value={responsible} onChange={(e)=> setresponsible(e.target.value)}/></div>
            <div className="form-group mt-2"><input className="form-control" type="text" placeholder="Priority" value={priority} onChange={(e)=> setpriority(e.target.value)}/></div>
            <div className="form-group mt-2"><input type="checkbox" value={completed} onChange={(e)=> setcompleted(!completed)}/></div>
            <button className="btn btn-primary" onClick={e => {
                alert(`your description is ${description},
                your responsible is ${responsible},
                is it completed ${completed}`
                );

                const newTodo = {
                    description: description,
                    responsible: responsible,
                    priority: priority,
                    completed: completed
                }

                axios.post('http://localhost:4000/todos/add', newTodo)
                        .then(res => _clearData());

                e.preventDefault(); // so that it doesn't bubble up to the top level
                }}>Submit</button>
        </form>
        </div>
    );
}

export default CreateTodo;