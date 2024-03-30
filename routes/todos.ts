import { Router } from 'express';           //only importing Router that we need

import { Todo } from '../models/todo';

const router = Router();

const todos: Todo[] = [];

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
})

router.post('/todo', (req,res,next)=>{
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text:req.body.text
    };
    todos.push(newTodo);
    res.status(200).json({ "Message": "Todo added succesfully","status":"Success" });
})

router.post('/deleteToDo',(req,res,next)=>{
    const reqID = req.body.id;
    for(let i =0;i<todos.length;i++){
        if(todos[i].id.includes(reqID)){
            todos.splice(i,1);
            return res.status(200).json({"Message":`The ID: ${reqID} was removed`,"status":"Success"})
        }
    }
    return res.status(404).json({"Message":"Seems like nothing was removed","status":"Failure"})
})
export default router;