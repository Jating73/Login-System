const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
  
app.use(express.json())

const port = process.env.port || 3000;

//Create Connection
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'loginsystem'
});

//Connect
db.connect((err)=>{
    if(err) throw err;
    console.log('MySQL connected...');
});

//Create DB
app.get('/createdb',(req,res)=>{
    let sql='CREATE DATABASE loginsystem';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({
            message:'Database created successfully'
        });
    });
});

//Create table
app.get('/createtable',(req,res)=>{
    let sql='CREATE TABLE users(name varchar(20),email varchar(30),password varchar(30), PRIMARY KEY(email))';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.status(200).json({
            message:"Table created successfully"
        });
    });
});

//Home route
app.get('/',(req,res)=>{
    res.send('Home');
});

//signup route
app.post('/signup',(req,res)=>{
    db.query("SELECT name FROM users WHERE email = '"+ req.body.email +"'", (err, result)=>{
        if(err) throw err;
        if(result.length === 0){
                if(err) throw err;
                else{
                    let entry={
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password
                    };
                    let sql='INSERT INTO users SET ?';
                    db.query(sql,entry,(err,result2)=>{
                        if(err) throw err;
                        console.log(result2);
                        res.status(201).json({
                            message:'User Created'
                        });
                    });
                }
        }else{
            return res.status(409).json({
                message:'Mail exists'
            });
        }
    });
});

//login route
app.post('/login',(req,res)=>{
    let email=req.body.email;
    let sql = `SELECT name,email,password FROM users WHERE email='${email}'`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        //console.log(result);
        if(result.length === 0){
            return res.status(401).json({
                message:'Auth Failed '
            });
        }
        if(req.body.password===result[0].password)
        {
            const token=jwt.sign(
                    {
                        name:result[0].name,
                        email:result[0].email
                    },
                    "secret",
                    {
                        expiresIn:"1h"
                    }
                )
            return res.status(200).json({
                message:'Auth successful',
                token:token
            });
        }
        res.status(401).json({
            message:'Auth Failed'
        });
    });
});

app.listen(port,()=>{
    console.log('Listening at port '+port);
})