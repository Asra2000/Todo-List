import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import TodosList from './components/todos-list';
import CreateTodo from './components/create-todo';
import EditTodo from './components/edit-todo';

import logo from './logo.png';
function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a href="#" className="navbar-brand" target='_blank'>
            <img src={logo} alt="logo" width='30' height='30'/>
          </a>
          <Link to='/' className='navbar-brand'>MERN Stack Todo App</Link>
          <div className="collapse navbar-collapse">
            <ul className='navbar-nav mr-auto'>
              <li className='navbar-item'>
                <Link to="/" className='nav-link'>Todos</Link>
              </li>
              {/* <li className='navbar-item'>
                <Link to="/" className='navbar-link'>Todos</Link>
              </li> */}
              <li className='navbar-item'>
                <Link to="/create" className='nav-link'>Create Todo</Link>
              </li>
            </ul>
          </div>
        </nav>

      <Route path='/' exact component={TodosList} />
      <Route path='/edit/:id' exact component={EditTodo} />
      <Route path='/create' exact component={CreateTodo} />

    </div>
      
    </Router>
  );
}

export default App;
