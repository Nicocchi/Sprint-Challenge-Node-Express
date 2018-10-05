import React, { Component } from 'react';
import axios from 'axios';
import ProjectList from './components/projects/ProjectList';
import './App.css';

class App extends Component {
  state = {
    projects: [],
  }

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects() {
    axios.get('http://localhost:9000/projects')
      .then(res => {
        this.setState({projects: res.data});
      })
      .catch(err => {
        console.error('ERROR', err);
      });
  }

  render() {
    return (
      <div className="App">
        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
