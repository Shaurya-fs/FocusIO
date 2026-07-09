const express=require('express');
const mysql=require("mysql2");
const cors = require("cors");
require("dotenv").config();
const app= express();
const port = 5001;
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT

});
db.connect((err)=>{
    if(err){
        console.log("Databse connection failed",err);
        return;
    }
    console.log("connected to MySQL");
});
app.get('/tasks', (req, res) => {
    const sql = "SELECT * FROM tasks";

   db.query(sql, (err, results) => {
    if (err) {
        console.error("MySQL Error:", err);

        return res.status(500).json({
            message: err.message
        });
    }

    res.json(results);
  });
});
app.post('/tasks',(req,res)=>{

    console.log("POST /tasks called");
    console.log(req.body);
    const{title}=req.body;

    if(!title){
        return res.status(400).json({message:'title is required'});
    }
    const sql = "INSERT INTO tasks (title, completed) VALUES (?, false)";
    db.query(sql,[title],(err,result)=>{
        if(err){
            return res.status(500).json({messgae:"Error Adding task"});
        }
        res.status(201).json({
            id: result.insertId,
            title,
            Description,
            dueDate,
            priority,
            estimatedDuration,
            completed:false
        });
    });
});
app.patch('/tasks/:id',(req,res)=>{
    const {id}=req.params;
    const{title,completed}= req.body;
    const sql = "UPDATE tasks SET title = ?, completed = ? WHERE id = ?";
    db.query(sql,[title,completed,id],(err,result)=>{
        if(err){
            return res.status(500).json({message:"Error updating task"});
        }
        if(result.affectedRows===0){
            return res.status(404).json({message:'Task not found'});
        }
        res.json({message :'task updated successfully'})
    });
});
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM tasks WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting task" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`the code is running at ${port}`)
})