const express= require('express');
const path=require('path');
const port = 8000;

const app= express();
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));
app.listen(port, function(err){
    if(err){
        console.log('server error ',err);
    }
    console.log('server running on Port ', port);
})

app.use(express.urlencoded());


app.get('/',function(req,res){
    console.log('hh');
//    return res.render('home',{
//    title: "To Do app"});

// printing by fetching from dp

    task.find({},function(err,tasks){
        if(err){
            console.log('error from fetching from db');
            return;
        }

        return res.render('home',{
            title: 'To do list',
            task_list: tasks,
        })
    })
})

const task=require('./models/task_Schema');

app.post('/Create_job', function(req,res){
    console.log(typeof(req.body.date));
    task.create({
        Description: req.body.Description,
        category: req.body.category,
        date: req.body.date,
    },function(err,new_contact){
        if(err){
            console.log('error in creating the contact ');
            return;
        }
        console.log(task);
        res.redirect('back');
    })
})

app.post('/delete-task',function(req,res){
    console.log('hh',req.body);
    var arr=req.body.delete;
    console.log(typeof(arr));
    for(let i in req.body){
        console.log(i);
    }
    var id;
    if(typeof(arr)=='string'){
        console.log(arr);
        id=arr;
        task.findByIdAndDelete(id,function(err){
            if(err){
                console.log('error in deeleteeing ')
            }

            return res.redirect('back');
        })
    }else{
        for(let i of arr){
            console.log(i);
            id=i;
            task.findByIdAndDelete(id,function(err){
                if(err){
                    console.log('error in deeleteeing ')
                }
                console.log('deleted',)
                
            })
        }

        return res.redirect('back');
    }
    
    return;
})



// connection to the database

const mongoose= require('mongoose');
const { resolveSoa } = require('dns');

mongoose.connect('mongodb://localhost/to_do__app_db');

const db=mongoose.connection;

db.on('error', console.error.bind(console,'error comign to db'));

db.once('open', function(){
    console.log('succesfully connected to database');
})


