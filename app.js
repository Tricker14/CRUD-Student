const express = require('express');
const mongoose = require('mongoose');
const student = require('./models/student')

const app = express();

app.use(express.json());

app.get('/', function(req, res){
    res.send('Hello');
})

// connect to db
const dbURI = 'mongodb+srv://admin:01042003@crud.oum62ph.mongodb.net/?retryWrites=true&w=majority';
async function connectDB(){
    try{
        await mongoose.connect(dbURI);
        app.listen(3000);
        console.log('Connected to DB');
    }
    catch(err){
        console.log(err);
    }
}
connectDB();

// get all students
app.get('/students', async function(req, res){
    try{
        const result = await student.find();
        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})

// get students by id
app.get('/student/:id', async function(req, res){
    try{
        const id = req.params.id;
        const result = await student.findOne({id: id});
        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})

// create students
app.post('/student', async function(req, res){
    try{
        const result = await student.create(req.body);
        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})

// update student by id
app.put('/student/:id', async function(req, res){
    try{
        const id = req.params.id;
        const result = await student.findOneAndUpdate({id: id}, req.body);
        if(!result){
            return res.status(404).json({message: `cannot find student with id ${id}`});
        }
        const updateResult = await student.findOne({id: id});
        res.status(200).json(updateResult);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})

// delete student by id
app.delete('/student/:id', async function(req, res){
    try{
        const id = req.params.id;
        const result = await student.findOneAndDelete({id: id});
        if(!result){
            return res.status(404).json({message: `cannot find student with id ${id}`});
        }
        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})

