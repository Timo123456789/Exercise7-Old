const express = require('express');
const mongodb = require('mongodb');
const port=3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * function which creates a Connection to MongoDB. Retries every 3 seconds if not connection could be established.
 */
async function connectMongoDB() {
    try {
        //connect to database server
        app.locals.dbConnection = await mongodb.MongoClient.connect("mongodb://mongodbservice:27017", { useNewUrlParser: true });
        //connect do database "itemdn"
        app.locals.db = await app.locals.dbConnection.db("itemdb");
        console.log("Using db: " + app.locals.db.databaseName);
        app.locals.db.collection("items").drop( (err,delOK) => {if(delOK) console.log("collections cleared")} );


    }
    catch (error) {
        console.dir(error)
        setTimeout(connectMongoDb, 3000)
    }
}
//Start connecting
connectMongoDB()

//Make all Files stored in Folder "public" accessible over localhost:3000/public
app.use('/public', express.static(__dirname + '/public'));

//Make all Files stored in Folder "__dirname" accessible over localhost:3000/src
app.use('/src', express.static(__dirname + ''));

//Make Leaflet accessible over localhost:3000/leaflet
app.use('/leaflet', express.static(__dirname + '/node_modules/leaflet/dist'));

//Make jquery accessible over localhost:3000/jquery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

//Make bootstrap accessible voer localhost:3000/bootstrap
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

//Make leafleatheat accessible voer localhost:3000/leaflet-heap
app.use('/leaflet-heat', express.static(__dirname + '/node_modules/leaflet.heat/dist'));

//Make leafleatheat accessible voer localhost:3000/leaflet-heap
app.use('/leaflet-draw', express.static(__dirname + '/node_modules/leaflet-draw/dist'));

//Send index.html on request to "/"
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index3.html')
})

//Send index.html on request to "/"
app.get('/pointeditorpage', (req,res) => {
    res.sendFile(__dirname + '/index2.html')
})

//Send index.html on request to "/"
app.get('/mainpage', (req,res) => {
    res.sendFile(__dirname + '/index3.html')
})


//Send index.html on request to "/"
app.get('/test', (req,res) => {
    res.sendFile(__dirname + '/test.html')
})




//Returns all items stored in collection items
app.get("/item", (req, res) => {
    //Search for all items in mongodb

    console.log("req body " + req.body.id);
    console.log(req.query);
    console.log(req.query.id);
    console.log(req.query.coordinates);
    
    if (req.query.id != undefined) {
        let letid = req.query.id;
    
        objid = {
            _id: new mongodb.ObjectID(letid)
        };
        app.locals.db.collection('items').find(objid._id).toArray((error, result) => {
            if (error) {
                console.dir(error);
            }
            res.json(result);
        });
    }
    else {
        req.body = {
            _id: new mongodb.ObjectID(req.body.id)
        };
        app.locals.db.collection('items').find().toArray((error, result) => {
            if (error) {
                console.dir(error);
            }
            res.json(result);
        });

    }


});


// listen on port 3000
app.listen(port,
    () => console.log(`Example app listening at http://localhost:${port}`)
)



//Handler for Post requests to "/item"
app.post("/item", (req, res) => {
    // insert item
    console.log("insert item " + JSON.stringify(req.body));
    app.locals.db.collection('items').insertOne(req.body, (error, result) => {
        if (error) {
            console.dir(error);
        }
        res.json(result);
    });
});



app.delete("/item", (req, res) => {
    // delete item
   
    console.log("delete item " + JSON.stringify(req.body));
    req.body = {_id: new mongodb.ObjectID(req.body.id)};
    app.locals.db.collection('items').deleteOne(req.body, (error, result) => {
        if (error) {
            console.dir(error);
        }
        res.json(result);
    });
});