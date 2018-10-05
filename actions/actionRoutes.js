const express = require('express');
const actionsDb = require('../data/helpers/actionModel.js');
const projectsDb = require('../data/helpers/projectModel.js');

const router = express.Router();

const validation = (req, res, next) => {
    // Check if the name or description is not empty, if it is empty, return an error
    if ( !req.body.project_id || !req.body.description || !req.body.notes ) return res.status(400).send({error: 'Please provide a valid project_id, description and notes.'});

    // Check if the name and descirption are less than 128, if it above, return an error
    if(req.body.description.length > 128) return res.status(422).send({err: 'You can only do a max of 128 characters for the name and description!'});

    // Check if the id exists for a project
    projectsDb.get(req.body.project_id)
        .then(proj => {
            if(!proj) return res.status(400).send({error: `Project does not exist by that ID ${req.body.project_id}`});
            next();
        })
        .catch(err => res.status(500).send({error: `Project does not exist by that ID ${req.body.project_id}`}));
}

// Get a full list of every action from the actions database
router.get('/', (req, res) => {
    actionsDb.get()
        .then(action => {
            res.send(action);
        })
        .catch(err => res.status(500).send({error: `The action information could not be retrieved. | ${err}`}));
});

// Get action for a specific action id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionsDb.get(id)
        .then(action => {
            if(!action) return res.status(422).send({error: `Project does not exist by that ID: ${id}`});
            res.send(action);
        })
        .catch(err => res.status(500).send({error: `The project information could not be retrieved. | ${err}`}));
});

// Post a new action to the actions database
router.post('/', validation, (req, res) => {
    const { project_id, description,notes, completed } = req.body;

    const newAction = { project_id, description,notes, completed };

    // Insert the new project into the database
    actionsDb.insert(newAction)
        .then(() => {
            res.status(200).json({message: 'Action added'});
        })
        .catch(err => res.status(500).send({error: `There was an error while saving the action to the database. | ${err}`}));
});

// Update an existing action
router.put('/:id', validation, (req, res) => {
    const { id } = req.params;
    const { project_id, description,notes, completed } = req.body;

    const updatedAction = { project_id, description,notes, completed };
    actionsDb.update(id, updatedAction)
        .then(actn => {
            if(!actn) return res.status(422).send({error: `Action does not exist by that ID: ${id}`});
            res.status(200).json(actn);
        })
        .catch(err => res.status(500).send({error: `The action could not be modified. | ${err}`}));
});

// Delete an existing action
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    actionsDb.remove(id)
        .then(rmvdAction => {
            if(!rmvdAction) return res.status(422).send({error: `Action does not exist by that ID: ${id}`});
            res.status(200).json(rmvdAction);
        })
        .catch(err => res.status(500).send({error: `The action could not be removed. | ${err}`}));
});

module.exports = router;