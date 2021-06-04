exports.importModule = function(app){
    //short url
    var { nanoid } = require("nanoid");
    const {MongoClient} = require('mongodb');
    app.set('view engine','ejs');

    app.get('/url-shortener', async (req, res)=>{
        var result = await mongoInteraction("listShortURL").catch(console.error);
        res.render('url-shortener', {data: result});
    })

    app.get('/listShortURL', async (req, res)=>{
        var result = await mongoInteraction("listShortURL").catch(console.error);
        res.send(result);
    })

    app.post('/api/insertShortURL', async (req, res)=>{
        var data = {
            fullURL: req.body.fullURL,
            shortURL: nanoid(6)
        }
        await mongoInteraction("insertShortURL", data).catch(console.error);
        res.redirect('/url-shortener');
    })

    app.get('/:shortURL', async (req, res)=>{
        new Promise((resolve, reject)=>{
            resolve( mongoInteraction("findShortURL",req.params.shortURL).catch(console.error) );
        }).then(result=>{
            res.redirect(301, result[0].fullURL);
        });
        
    })

    async function mongoInteraction(action, data){
        const uri = process.env.MONGO_URI;
        const mongodb =  new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
        try {
            // Connect to the MongoDB cluster
            await mongodb.connect();
            
            // Make the appropriate DB calls
            if(action =="listShortURL"){
                return await listShortURL(mongodb);
            }
            else if(action == "insertShortURL"){
                return await insertShortURL(mongodb, data);
            }
            else if(action == "findShortURL"){
                return await findShortURL(mongodb, data);
            }
    
        } catch (e) {
            console.error(e);
        } 
        // finally {
            //await mongodb.close();
        //}
    }

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
}