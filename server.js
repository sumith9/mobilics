const express = require("express")
const {MongoClient} = require("mongodb")
const request = require("request")

const app = express();
const port = 5000;

let db


app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public"));

async function start() {
    const uri = "mongodb+srv://poonersumith9:U5URgjV6YGliKHWg@mobilicis.ut9svcj.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri)
  

    await client.connect();
    db = client.db("Mobilicis");
    app.listen(port, () =>
    console.log("Server is listening on port: http://localhost:${port}"));
    


  
}

start().catch(console.error);


async function createListing(client, newListing){
  const result = await db.collection("Mobilicis").insertOne(newListing);
  console.log(result.instertedId);
}


app.get("/home", async (req, res) =>{
    
    
    const sam = await db.collection("Mobilicis").find().toArray()
    // res.send(`<h1>welcome to page</h1>,  ${sam.map(sa => `<p>${sa.first_name} - ${sa.income}</p>`).join('')}`);
    res.send(sam)
})

app.get("/", async (req, res) =>{
    
    
    // const sam = await db.collection("Mobilicis").find().toArray()
    // res.send(`<h1>welcome to page</h1>,  ${sam.map(sa => `<p>${sa.first_name} - ${sa.income}</p>`).join('')}`);
    // res.render("home", {sam})
    res.send(`<h1>Hello there</h1> <p>please enter /home to view</p>`)
})



