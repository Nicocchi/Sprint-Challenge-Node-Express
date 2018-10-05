import React from 'react';
import Project from './Project';

function ProjectList(props) {
    return props.projects.map(project => { return (<Project key={project.id} project={project} />)})
};

export default ProjectList;