const express =  require("express")
const bodyParser = require("body-parser");
const connect_db = require("./config/connectdb.js");
const userRoute = require("./Routes/userroutes.js")
const multer = require("multer")
const app = express();


//json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/",express.static("uploads"))

//routes
app.use("/api/user",userRoute);


app.listen(3000,async()=>{
    try {
        await connect_db;
        console.log(`listening on http://localhost:${3000} `);
    } catch (error) {
        console.error(error)
    }
})