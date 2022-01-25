const mongoose= require('mongoose');

const Task_schema= new mongoose.Schema({
    Description:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    date:{
       type: Date,
       require: true 
    }

});

const task=mongoose.model('task_Schema',Task_schema);

module.exports=task;