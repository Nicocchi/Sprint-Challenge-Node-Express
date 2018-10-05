import React, { Component } from 'react';
import axios from 'axios';
import ProjectList from './components/projects/ProjectList';

import Styled from 'styled-components';

const Wrapper = Styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`;

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
      <Wrapper>
        <ProjectList projects={this.state.projects} />
      </Wrapper>
    );
  }
}

export default App;
