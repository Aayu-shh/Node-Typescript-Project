import { Router } from 'express';           //only importing Router that we need

import { Todo } from '../models/todo';

const router = Router();
type RequestBodyId = {id:string};
type RequestBody = {id:string,text:string};

//Below todos list only exist in Memory so will RESET on server restart
let todos: Todo[] = [];

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
})

router.post('/addToDo', (req,res,next)=>{
    
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text:body.text
    };
    todos.push(newTodo);
    res.status(201).json({ "Message": "Todo added succesfully","status":"Success" });
})

router.post('/deleteToDo',(req,res,next)=>{
    const bodyWithID = req.body as RequestBodyId;
    const reqID = bodyWithID.id;

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
    for(let i =0;i<todos.length;i++){
        if(todos[i].id===(reqID)){
            todos.splice(i,1);
            return res.status(200).json({"Message":`The ID: ${reqID} was removed`,"status":"Success"})
        }
    }
    return res.status(404).json({"Message":"Seems like nothing was removed","status":"Failure"})
})

router.post('/editToDo', (req, res, next) => {
    const body = req.body as RequestBody;
    const reqID = body.id;
    const reqText = body.text;
    const todoIndex = todos.findIndex((todoItem)=> reqID===todoItem.id);
    if(todoIndex!=-1)
    {
        todos[todoIndex] = {id:reqID,text:reqText};
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
})
export default router;