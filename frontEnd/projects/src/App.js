import React from 'react';
import './App.css';
import ProjectList from './components/projectList';
import axios from 'axios';



class App extends React.Component {

  state = {
    projects: []
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/projects/')
      .then(res => this.setState({projects: res.data}))
      .catch(err => console.log(err));


  }

  render () {
    console.log(this.state.projects);
    return (
      <div className="App">
        <header className="App-header">
          
        </header>

        <ProjectList projects={this.state.projects}/>



      </div>
    );
  }
  
}

export default App;
