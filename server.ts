//const express = require('express');//Require method only in Node --> @types/node  helps understand / translate node ka code to TS

import express from 'express';         
import todosRoutes from './routes/todos';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());
app.use(todosRoutes);

//default route
app.use((req,res,next)=>{
    res.status(200).json("Seems like you hit the default response, I guess nothing else was hit!");
});
app.listen(9090);