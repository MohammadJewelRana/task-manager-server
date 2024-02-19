const express=require('express')
const app=express();

const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();
const cors=require('cors');
const port=process.env.PORT || 5000;



//middleware
app.use(cors())
app.use(express.json());

//////////////////////////  mongodb start   /////////////////////////////





 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.843endu.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    /////  code start //////


   //all collection
   const taskCollection = client.db("task-manager").collection('tasks');




      app.post('/tasks',async(req,res)=>{
        const newTasks=req.body;
        // console.log(newTasks);
        const result=await taskCollection.insertOne(newTasks);
        res.send(result)

      })

      app.get('/tasks',async(req,res)=>{

        const task=taskCollection.find(); 
        const result=await task.toArray();

        res.send(result);
      })






    ////////////end code //////////////////

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);















/////////////////////////////////////////////////////////////////////////////////////////////
app.get('/',(req,res)=>{
    res.send('Task manager is running')
});

app.listen(port,()=>{
    console.log(port);
})