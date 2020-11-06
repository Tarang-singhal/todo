const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const listRoutes = require('./Routes/listRoutes');
const todosRoutes = require('./Routes/todosRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// connection to mongoDB Cluster
require('./Database/connection');

//routes of all todo list
app.use(listRoutes);

//routes of a todo page
app.use(todosRoutes);

//production environment rules
if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const PORT = process.env.PORT;
app.listen(PORT,(req,res)=>{
    console.log(`Server started at: ${PORT}`);
});
