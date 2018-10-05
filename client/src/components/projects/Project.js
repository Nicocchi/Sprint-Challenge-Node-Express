import React from 'react';
import Styled from 'styled-components';

const Wrapper = Styled.div`
    width: 700px;
    text-align: center;
    border: 1px solid black;
    overflow: hidden;
    margin: 10px;
`;

function Project(props) {
    return (
        <Wrapper>
            <h1>{props.project.name}</h1>
            <p>{props.project.description}</p>
        </Wrapper>
    )
};

export default Project;