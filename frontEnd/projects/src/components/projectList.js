import React from 'react';

const projectList = (props) => {
    return(
        <div className = "projects">
            <h1>Projects</h1>
            <ul>
                {props.projects.map( (project, index) => {
                    return (
                        <div className = 'project'>
                            <h2>Project: {index + 1}</h2>
                            <h3>{project.name}: </h3>
                            <p>{project.description}</p> 
                            <p>{project.completed}</p>
                        </div>

                        
                    )
                })

                }
            </ul>
        </div>
    )
}

export default projectList;