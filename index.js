const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const helmet = require('helmet');
app.use(helmet());
const cors = require('cors');

const mysql = require('mysql');


const bcrypt = require('bcrypt');
const saltRounds = 10;

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const PORT = process.env.PORT || 5000;


const db = mysql.createPool({
    hostname: 'localhost',
    user: 'clinic_app',
    password: 'clinic_app',
    database: "clinic"
});
var whitelist = ["https://dizzon-webapp-todolist.herokuapp.com","https://dizzonwebapp-todolist-6wnm8.ondigitalocean.app"];
app.use(cors({
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
    methods: ["GET","POST","HEAD"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSession({
    key: "userId",
    secret: "clinicS.ecret",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60*60*24*1000,
    }
}))


app.get('/api/todolist', (req, res) => {
    let data = require('./todolist.json');
    res.send(data);
});


app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT email, clinicName, phoneNumber, address FROM userInfo;";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    });
});
app.get('/api/login', (req, res) => {
    if(req.session.user){
        res.send({loggedIn:true, user:req.session.user})
    }
    else{
        res.send({loggedIn:false});
    }
});
app.get('/api/record', (req, res) => {
    const sqlSelect = "SELECT doctor_name, patient_name, diagnosis, medication, consultation_fee, date_time, follow_up FROM consultation_record;";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    });
});

app.post('/api/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sqlSelect = "SELECT * FROM userInfo WHERE email = ?;";
    db.query(sqlSelect,[email], (err, result) =>{
        
        if(err){
            console.log(err);
            res.send({message: "error, please see server log"});
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (error, response)=>{
                if(response){
                    delete result[0].id;
                    delete result[0].password;
                    req.session.user = result;
                    // console.log(req.session.user);
                    res.send(result)
                }
                else{
                    res.send({message: "Password not match"});
                }
            });
        }
        else{
            res.send({message: "User doesn't exist"});
        }
    });
});

app.post('/api/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const clinicName = req.body.clinicName;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;

    bcrypt.hash(password, saltRounds, (err, hash)=>{
        if(err){
            console.log(err);
        }
        const sqlInsert = "INSERT INTO userInfo (email, password, clinicName, phoneNumber, address) VALUES (?,?,?,?,?);";
        db.query(sqlInsert, [email, hash, clinicName, phoneNumber, address], (err, result)=>{
            if(err==null){
                res.send("sucessfully inserted");
            }
            else{
                console.log(err);
            }
        });
    });
});

app.post('/api/createNewConsultationRecord', (req, res) => {
    const doctor_name = req.body.doctor_name;
    const patient_name = req.body.patient_name;
    const diagnosis = req.body.diagnosis;
    const medication = req.body.medication;
    const consultation_fee = req.body.consultation_fee;
    const date_time = req.body.date_time;
    const follow_up = req.body.follow_up;

    if(req.body.date_time == ""){
        const sqlInsert = "INSERT INTO consultation_record (doctor_name, patient_name, diagnosis, medication, consultation_fee, date_time, follow_up) VALUES (?,?,?,?,?, now(),?);";
        db.query(sqlInsert, [doctor_name, patient_name, diagnosis, medication, consultation_fee, follow_up], (err, result)=>{
            if(err==null){
                res.send("sucessfully inserted a consultation record");
            }
            else{
                console.log(err);
            }
        });
    }
    else{
        const sqlInsert = "INSERT INTO consultation_record (doctor_name, patient_name, diagnosis, medication, consultation_fee, date_time, follow_up) VALUES (?,?,?,?,?,?,?);";
        db.query(sqlInsert, [doctor_name, patient_name, diagnosis, medication, consultation_fee, date_time, follow_up], (err, result)=>{
            if(err==null){
                res.send("sucessfully inserted a consultation record");
            }
            else{
                console.log(err);
            }
        });
    }
    
    
    
});

app.post('/api/logout', (req, res) => {
    if(req.session.user){
        // res.send({loggedIn:true, user:req.session.user})
        req.session.destroy((err) => {
            if(err){
                console.log("logout error: "+err);
            }
            else{
                res.send({loggedIn:false});
            }
        });
    }
    else{
        // res.send({loggedIn:false});
    }
    
});



app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`);
});