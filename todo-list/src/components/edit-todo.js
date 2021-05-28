import React, {Component} from 'react';
import axios from 'axios';
export default class EditTodo extends Component {

    constructor(props){
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeResponsible = this.onChangeResponsible.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeCompleted = this.onChangeCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            responsible: '',
            priority: '',
            completed : false
        }
    }

    componentDidMount(){
        console.log(this.props.match.params.id);    

        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
        .then(res => {
            this.setState({description : res.data.description,
                 responsible : res.data.responsible, 
                 priority: res.data.priority, 
                 completed: res.data.completed
                })
        })

            .catch(err => console.log(err));
    }

    onChangeResponsible(e){
        this.setState({
            responsible : e.target.value
        });
    }
    onChangePriority(e){
        this.setState({
            priority : e.target.value
        });
    }
    onChangeCompleted(e){
        this.setState({
            completed : !this.state.completed
        });
    }
    onChangeDescription(e){
        this.setState({
            description : e.target.value
        });
    }

    onSubmit(e){
        e.prevent.Default();
        const obj = {
            description: this.state.description,
            responsible: this.state.responsible,
            priority: this.state.priority,
            completed: this.state.completed
        }


        axios.post('http://localhost:4000/todos/update/'+ this.props.match.params.id, obj)
        .then(res => {
            console.log(res);
            this.props.history.push('/');
        }).catch(err => console.log(err));

    }

    render(){
        return <>
        <h3>Upate Todo List</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group mt-2"><input className="form-control"  type="text" placeholder="Description" value={this.state.description} onChange={(e)=> this.onChangeDescription}/></div>
            <div className="form-group mt-2"><input className="form-control" type="text" placeholder="Responsible" value={this.state.responsible} onChange={(e)=> this.onChangeResponsible}/></div>
            <div className="form-group mt-2"><input className="form-control" type="text" placeholder="Priority" value={this.state.priority} onChange={(e)=> this.onChangePriority}/></div>
            <div className="form-group mt-2"><input type="checkbox" value={this.state.completed} onChange={(e)=> this.onChangeCompleted}/></div>
            <button className="btn btn-primary" type='submit'>
            Change
            </button>
        </form>
        </>;
    }
    
}
