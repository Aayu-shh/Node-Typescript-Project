"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //only importing Router that we need
const router = (0, express_1.Router)();
//Below todos list only exist in Memory so will RESET on server restart
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/addToDo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ "Message": "Todo added succesfully", "status": "Success" });
});
router.post('/deleteToDo', (req, res, next) => {
    const reqID = req.body.id;
    //logic 2 -- Need more Chnages for comparing array of Objects -- DOESNT work now
    // -- Problem only when Element not found STILL 200 response message is SENT --
    // let todos1 = todos.filter((todoitem) => reqID !== todoitem.id);
    // if(todos1 == todos)
    // {
    //     return res.status(404).json({ "Message": "Seems like nothing was removed", "status": "Failure" }) 
    // }
    // else{
    //     todos=todos1;
    //     return res.status(200).json({ "Message": `The ID: ${reqID} was removed`, "status": "Success" })
    // }
    //Original logic
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === (reqID)) {
            todos.splice(i, 1);
            return res.status(200).json({ "Message": `The ID: ${reqID} was removed`, "status": "Success" });
        }
    }
    return res.status(404).json({ "Message": "Seems like nothing was removed", "status": "Failure" });
});
router.post('/editToDo', (req, res, next) => {
    const reqID = req.body.id;
    const reqText = req.body.text;
    const todoIndex = todos.findIndex((todoItem) => reqID === todoItem.id);
    if (todoIndex != -1) {
        todos[todoIndex] = { id: reqID, text: reqText };
        return res.status(200).json({ "Message": `The text with ToDo ID: ${reqID} was edited`, "status": "Success" });
    }
    return res.status(404).json({ "Message": "Seems like nothing was found to be Edited", "status": "Failure" });
    //original logic
    // for (let i = 0; i < todos.length; i++) {
    //     if (todos[i].id === (reqID)) {
    //         todos[i].text = reqText;
    //         return res.status(200).json({ "Message": `The text with ToDo ID: ${reqID} was edited`, "status": "Success" });
    //     }
    // }
    // return res.status(404).json({ "Message": "Seems like nothing was found to be Edited", "status": "Failure" });
});
exports.default = router;
