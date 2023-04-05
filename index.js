const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {  MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// middleWars 
app.use(express.json());
app.use(cors());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u3yaa.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJwt (req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({message: 'unauthorized access'});
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, function(err,decoded){
        if(err){
           return res.status(401).send({message: 'unauthorized access'});
        }
        req.decoded = decoded;
        next();
    })
}

async function run(){
    try{
        const serviceCollection = client.db('geniusCar').collection('services');
        const orderCollection = client.db('geniusCar').collection('orders');

        // jwt Token

        app.post('/jwt',(req,res)=>{
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn:'1h'
            })
            res.send({token});
        })

        app.get('/services',async (req,res)=>{
            const query = {};
            const order = req.query.order === 'asc' ? 1 : -1;
            const cursor = serviceCollection.find(query).sort({price: order});
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/services/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const service = await serviceCollection.findOne(query);
            res.send(service)
        })

        // Orders Api
        app.get('/orders',verifyJwt, async (req,res)=>{
            const decoded = req.decoded;
            if(decoded.email !== req.query.email){
                res.status(403).send({message: 'unauthorized access'})
            }
            let query = {};
            if(req.query.email){
                query = {email: req.query.email}
            }
            const cursor = orderCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/orders',async(req,res)=>{
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })
        app.patch('/orders/:id', async (req,res) => {
            const id = req.params.id;
            const status = req.body.status;
            const filter = {_id: new ObjectId(id)};
            const updatedDoc = {
                $set:{
                    status: status
                }
            }
            const result = await orderCollection.updateOne(filter,updatedDoc);
            res.send(result);
        })
        app.delete('/orders/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id : new ObjectId(id)}
            const result = await orderCollection.deleteOne(query)
            res.send(result);
        })
    }
    finally{
        // await client.close()
    }
}
run().catch(err=> console.log(err))


app.get('/', (req,res)=>{
    res.send('genius car server is running')
})
app.listen(port, ()=>{
    console.log(`genius car server running ${port}`);
})