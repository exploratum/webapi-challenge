const actionModel = require('../data/helpers/actionModel') ;
const projectModel = require('../data/helpers/projectModel');

const express = require('express');
const router = express.Router();


/****************************************/
/*          Get all Actions             */
/****************************************/

router.get('/', async (req, res) => {
    try {
        const actions = await actionModel.get();
        res.status(200).json(actions)
    }
    catch {
        res.status(500).json({"errorMessage": "Cannot get projects from database"})
    }
});

/****************************************************************/
/*                  Get an action by its id                     */
/****************************************************************/

router.get('/:id', validateIdAndSaveAction, async (req, res) => {
    const action = req.action;
    if(action) {
        res.status(200).json(action);
    }
    else {
        res.status(500).json({"errorMessage": "Cannot get action from database"})
    }
});
/****************************************/
/*        Insert a new action           */
/****************************************/
router.post ('/', validateActionInfo, async (req,res) => {
    const body = req.body;
    try {
        action = await actionModel.insert(body);
        res.status(201).json(action);
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem adding the action"})
    }
})

/**********************************************/
/*        Update an existing action           */
/**********************************************/

router.put('/:id', validateIdAndSaveAction, validateActionInfo, async (req,res) => {
    const body = req.body;
    const id = req.params.id;

    try {
        const action = await actionModel.update(id, body);
        res.status(200).json(action);
    }
    catch {
        res.status(500).json({"errorMessage": "Project could not be inserted in database"});
    }
}) 

/**********************************************/
/*        Delete an existing action           */
/**********************************************/

router.delete('/:id', validateIdAndSaveAction, async (req,res) => {
    const id = req.params.id;
    try {
        const count = await actionModel.remove(id);
        res.status(200).json(`message: ${count} record(s) deleted`);
    }
    catch {
        res.status(500).json({"errorMessage": "Project could not be deleted from database"});
    }
}) 



/********************************************************************************/
/*                              Custom Middleware                               */
/********************************************************************************/


/**************************************************************/
/*     Validate Action Id and save existing action in req     */
/**************************************************************/

async function validateIdAndSaveAction(req, res, next) {
    const id = req.params.id;
    if(id) {
        try {
            const action = await actionModel.get(id);
            if(action) {
                req.action = action;
                next();
            }
            else
                res.status(400).json({"errorMessage": "This action id does not exist"})
        } 
        catch {
            res.status(500).json({"errorMessage": "That was a problem checking the action id - existing id?"})
        }
    }
    else {
        res.status(400).json({"errorMessage": "You need to provide an action id"})
    }
};

/****************************************/
/*        Validate Action info         */
/****************************************/
async function validateActionInfo(req,res, next) {
    const body = req.body;

    if(body.project_id && body.description && body.notes) {
        try {
            const project = await projectModel.get(body.project_id);
            if (project) {
                next();
            }
            else {
                res.status(400).json({"errorMessage":"The provided project id does not exist"})
            }
        }
        catch {
            res.status(500).json({"errorMessage": "That was a problem checking project id for this action"})
        }
    }
    else {
        res.status(400).json({"errorMessage":"project id, description and notes are required"});
    }
}

module.exports = router;