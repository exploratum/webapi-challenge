const projectModel = require('../data/helpers/projectModel');

const express = require('express');
const router = express.Router();


/****************************************/
/*          Get all Projects            */
/****************************************/

router.get('/', async (req, res) => {
    try {
        const projects = await projectModel.get();
        res.status(200).json(projects)
    }
    catch {
        res.status(500).json({"errorMessage": "Cannot get projects from database"})
    }
});

/***************************************************************/
/*        Get a Project by its id and all related actions      */
/****************************************************************/

router.get('/:id', validateProjectId, async (req, res) => {
    const id = req.params.id;
    try {
        const project = await projectModel.get(id);
        res.status(200).json(project);
    }
    catch {
        res.status(500).json({"errorMessage": "Cannot get project from database"})
    }
});

/****************************************/
/*        Insert a new project          */
/****************************************/
router.post('/', validateProjectInfo, async (req, res) => {
    const body = req.body;
    try {
        const project = await projectModel.insert(body);
        res.status(201).json(project);
    }
    catch {
        res.status(500).json({"errorMessage": "Project could not be inserted in database"});
    }
    
})

/**********************************************/
/*        Update an existing project          */
/**********************************************/

router.put('/:id', validateProjectId, validateProjectInfo, async (req,res) => {
    const body = req.body;
    const id = req.params.id;
    try {
        const project = await projectModel.update(id, body);
        res.status(200).json(project);
    }
    catch {
        res.status(500).json({"errorMessage": "Project could not be inserted in database"});
    }
}) 

/**********************************************/
/*        Delete an existing project          */
/**********************************************/

router.delete('/:id', validateProjectId, async (req,res) => {
    const id = req.params.id;
    try {
        const count = await projectModel.remove(id);
        res.status(200).json(`message: ${count} record(s) deleted`);
    }
    catch {
        res.status(500).json({"errorMessage": "Project could not be deleted from database"});
    }
}) 


/********************************************************************************/
/*                              Custom Middleware                               */
/********************************************************************************/


/****************************************/
/*        Validate Project Id           */
/****************************************/

async function validateProjectId(req, res, next) {
    const id = req.params.id;
    if(id) {
        try {
            const project = await projectModel.get(id);
            if(project) 
                next();
            else
                res.status(400).json({"errorMessage": "This project id does not exist"})
        } 
        catch {
            res.status(500).json({"errorMessage": "That was a problem checking the id"})
        }
    }
    else {
        res.status(400).json({"errorMessage": "You need to provide an id"})
    }
};

/****************************************/
/*        Validate Project info         */
/****************************************/
async function validateProjectInfo(req,res, next) {
    const body = req.body;

    if(body.name && body.description) {
        next();
    }
    else {
        res.status(400).json({"errorMessage":"name and description are required"});
    }
}

module.exports = router;