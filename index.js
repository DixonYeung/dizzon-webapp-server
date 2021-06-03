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

const {MongoClient} = require('mongodb');

const PORT = process.env.PORT || 5000;


const db = mysql.createPool({
    hostname: 'localhost',
    user: 'clinic_app',
    password: 'clinic_app',
    database: "clinic"
});


var whitelist = ["dizzon-webapp-server.herokuapp.com","https://dizzon-webapp-todolist.herokuapp.com","https://dizzonwebapp-todolist-6wnm8.ondigitalocean.app","https://dizzonwebapp-todolist.on.fleek.co","https://dizzon-todolist.netlify.app"];
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

var { nanoid } = require("nanoid");

//db
async function main(action, collection){
    const uri = process.env.MONGO_URI;
    const mongodb =  new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
    try {
        // Connect to the MongoDB cluster
        await mongodb.connect();
        
        // Make the appropriate DB calls
        if(action == "listdb"){
            return await listDatabases(mongodb);
        }
        else if(action =="listCollection"){
            return await listCollection(mongodb, collection);
        }

        else if(action == "createCollection"){
            if(collection.length > 0){
                return await createCollection(mongodb, collection);
            }
            else{
                return "collection must not be null";
            }
        }
        else if(action =="dropCollection"){
            if(collection.length > 0){
                return await dropCollection(mongodb, collection);
            }
            else{
                return "collection must not be null";
            }
        }
        else if(action == "listAllData"){
            if(collection.length > 0){
                return await listAllMarker(mongodb, collection);
            }
            else{
                return "collection must not be null";
            }
        }
        else if(action == "insertAllMarker"){
            if(collection.length > 0){
                return await insertAllMarker(mongodb, collection);
            }
            else{
                return "collection must not be null";
            }
        }
        else if(action =="deleteAllMarker"){
            if(collection.length > 0){
                return await deleteAllMarker(mongodb, collection);
            }
            else{
                return "collection must not be null";
            }
        }
        else if(action =="listShortURL"){
            return await listShortURL(mongodb);
        }
        else if(action == "insertShortURL"){
            return await insertShortURL(mongodb, collection);
        }
        else if(action == "findShortURL"){
            return await findShortURL(mongodb, collection);
        }

    } catch (e) {
        console.error(e);
    } 
    // finally {
        //await mongodb.close();
    //}
}
async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    let temp = "";
    databasesList.databases.forEach(db => temp = temp + db.name + "<br>");
    console.log(temp);
    client.close();
    return temp;
};

async function createCollection(client, collection){
    return new Promise(function(resolve, reject){
        client.db().createCollection(collection, function(err, res) {
            if (err) {
                resolve("error occurred");
            }
            console.log("Collection created!");
            client.close();
            resolve("create collection - "+ collection +" success");
        });
    });
    
};


async function listCollection(client){
    return new Promise(function(resolve, reject){
        client.db().listCollections().toArray( function(err, collectionList){
            if(err){
                console.log(err);
                resolve("error in listing collection");
            }
            console.log(JSON.stringify(collectionList));
            client.close();
            resolve(JSON.stringify(collectionList));
        });
    }); 
};

async function dropCollection(client, collection){
    return new Promise(function(resolve, reject){
        client.db().collection(collection).drop( function(err, delOK){
            if(err){
                console.log(err);
                resolve("error in dropping collection");
            }
            console.log(delOK);
            client.close();
            resolve("collection - "+ collection +" dropped");
        });
    }); 
};


async function listAllMarker(client){
    return new Promise(function(resolve, reject){
        client.db().collection("marker_info").find({}).toArray( function(err, result){
            if(err){
                console.log(err);
                resolve( "error in marker_info find" );
            }
            console.log(JSON.stringify(result));
            client.close();
            resolve(JSON.stringify(result));
        });
    }); 
};

async function deleteAllMarker(client){
    return new Promise(function(resolve, reject){
        client.db().collection("marker_info").find({}).toArray( function(err, result){
            if(err){
                console.log(err);
                resolve( "error in marker_info find" );
            }
            console.log("delete all marker: find all marker successfully");
            resolve(result);
        });
    }).then(function(result){
        if(result.length > 0){
            return new Promise(function(resolve, reject){
                client.db().collection("marker_info").deleteMany( {} ,function(err, result){
                    if(err){
                        console.log(err);
                        resolve( "error in marker_info delete all" );
                    }
                    console.log("all marker deleted");
                    client.close();
                    resolve("all marker deleted");
                });
            })
        }
    });
    
};

async function insertAllMarker(client){
    return new Promise(function(resolve, reject){
        client.db().collection("marker_info").find({}).toArray( function(err, result){
            if(err){
                console.log(err);
                resolve( "error in marker_info find" );
            }
            console.log("insert all marker: find all marker successfully");
            resolve(result);
        });
    }).then(function(result){
        if( ! (result.length > 0) ){
            return new Promise(function(resolve, reject){
                let data = require("./marker_info.json");
                client.db().collection("marker_info").insertMany( data ,function(err, result){
                    if(err){
                        console.log(err);
                        resolve( "error in marker_info insert all" );
                    }
                    console.log("all marker inserted");
                    client.close();
                    resolve("all marker inserted");
                });
            })
        }
    }); 
};

async function listShortURL(client){
    return new Promise(function(resolve, reject){
        client.db().collection("shortUrl").find({}).toArray( function(err, result){
            if(err){
                console.log(err);
                resolve( "error in finding data in shortUrl collection " );
            }
            client.close();
            resolve(result);
        });
    }); 
};




async function insertShortURL(client, data){
    return new Promise(function(resolve, reject){
        client.db().collection("shortUrl").find({fullURL: data.fullURL}).toArray( function(err, result){
            if(err){
                console.log(err);
                resolve( "error in shortUrl find" );
            }
            console.log(result);
            resolve(result);
        });
    }).then(function(result){
        if( ! (result.length > 0) ){
            return new Promise(function(resolve, reject){
                client.db().collection("shortUrl").insertOne( data ,function(err, result){
                    if(err){
                        console.log(err);
                        resolve( "error when inserting data into shortUrl collection" );
                    }
                    console.log("data successfully inserted into shortUrl collection");
                    client.close();
                    resolve("successfully inserted");
                });
            })
        }
    }); 
};

async function findShortURL(client, shortURL){

    return new Promise(function(resolve, reject){
        client.db().collection("shortUrl").find({shortURL: shortURL}).toArray( function(err, result){
            if(err){
                console.log(err);
                resolve( "error in finding data in shortUrl collection " );
            }
            client.close();
            resolve(result);
        });
    }); 
};


//db api
app.get('/api/mongodb', async (req, res)=>{
    let action = req.query.action;
    let collection = req.query.collection;
    if(action){
        res.send( await main(action,collection).catch(console.error) );
        console.log("response sent");
    }
    else{
        console.log("no action is requested");
        res.send("no action is requested");
    }
});


//short url

app.set('view engine','ejs');

app.get('/url-shortener', async (req, res)=>{
    var result = await main("listShortURL").catch(console.error);
    res.render('url-shortener', {data: result});
})

app.post('/api/insertShortURL', async (req, res)=>{
    var data = {
        fullURL: req.body.fullURL,
        shortURL: nanoid(6)
    }
    await main("insertShortURL", data).catch(console.error);
    res.redirect('/url-shortener');
})

app.get('/:shortURL', async (req, res)=>{
    new Promise((resolve, reject)=>{
        resolve( main("findShortURL",req.params.shortURL).catch(console.error) );
    }).then(result=>{
        res.redirect(301, result[0].fullURL);
    });
    
})










//to do list api
app.get('/api/todolist', (req, res) => {
    let data = require('./todolist.json');
    res.send(data);
});

//rest of the api
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
