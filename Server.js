var mongoose = require('mongoose')

//express application settup

var express = require('express')
var app = express()
app.use(express.json())
const port = process.env.PORT || 5000

 
require("./db/conn")

const Student = require("./models/students")

app.get('/',(req,res)=>{
    res.send("hello from other side")
})
app.post('/students',async(req,res)=>{

    const user = await new Student(req.body)
    user.save().then(()=>{
        console.log(user)
        res.status(200).json(user)
    })
    .catch((error)=>{
        res.status(400).send(error)
    })      
   
})

app.get('/getallstudents',async(req,res)=>{
    try{
    const result = await Student.find()
    res.status(200).json(result)
    }
    catch(err){
        res.status(400).send(err)
    }

})

app.patch('/updatestudentData/:id/:name',async(req,res)=>{
    try{
        let _id = req.params.id
        const result = await Student.findByIdAndUpdate({_id},{$set:{
            name : req.params.name
        }},{
            new : true,
            useFindAndModify: false
        })
        res.status(200).json(result)
        }
        catch(err){
            res.status(400).send(err)
        }
})

app.delete('/deleteoneuser/:id',async(req,res)=>{
    try{
        let _id=req.params.id;
        const result = await Student.findByIdAndDelete(_id)
        res.status(200).json(result)
        }
        catch(err){
            res.status(400).send(err)
        }
})
app.listen(port,()=>{
    console.log(`app is listen on port ${port}`)
})