const express = require('express');
const projectsDb = require('../data/helpers/projectModel.js');

const router = express.Router();

const validation = (req, res, next) => {
    let name = '';
    if(req.body.name) name = req.body.name;
    // Check if the name or description is not empty, if it is empty, return an error
    if ( !req.body.name || !req.body.description ) return res.status(400).send({error: 'Please provide a valid name, description.'});

    // Check if the name and descirption are less than 128, if it above, return an error
    if(req.body.name.length > 128 || req.body.description.length > 128) return res.status(422).send({err: 'You can only do a max of 128 characters for the name and description!'});
    next();
}

// Get a full list of every project from the projects database
router.get('/', (req, res) => {
    projectsDb.get()
        .then(project => {
            res.send(project);
        })
        .catch(err => res.status(500).send({error: `The project information could not be retrieved. | ${err}`}));
});

// Get project actions for a specific project
router.get('/proj-actions/:id', (req, res) => {
    const { id } = req.params;
    projectsDb.getProjectActions(id)
        .then(project => {
            if(!project) return res.status(422).send({error: `Project does not exist by that ID: ${id}`});
            res.send(project);
        })
        .catch(err => res.status(500).send({error: `The project information could not be retrieved. | ${err}`}));
});

// Post a new project to the projects
router.post('/', validation, (req, res) => {
    const { name, description, completed } = req.body;

    const newProject = { name, description, completed };

    // Insert the new project into the database
    projectsDb.insert(newProject)
        .then(projectId => {
            projectsDb.get(projectId.id)
                .then(proj => {
                    if(!proj) return res.status(422).send({error: `Project does not exist by that ID: ${id}`});

                    res.status(200).json(proj);
                })

        })
        .catch(err => res.status(500).send({error: `There was an error while saving the project to the database. | ${err}`}));
});

// Update an existing project
router.put('/:id', validation, (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;

    const updatedProject = { name, description, completed };
    projectsDb.update(id, updatedProject)
        .then(proj => {
            if(!proj) return res.status(422).send({error: `Project does not exist by that ID: ${id}`});
            res.status(200).json(proj);
        })
        .catch(err => res.status(500).send({error: `The project could not be modified. | ${err}`}));
});

module.exports = router;