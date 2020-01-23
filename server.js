const express = require("express");
const mongoose = require("mongoose")
const logger = require("morgan")
const PORT = process.env.PORT || 8080;
const app = express();
const router = express.Router();
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(router);
app.use(logger("dev"))

require("./config/routes")(router);

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI)

mongoose.connect(MONGODB_URI, function(error){
    if(error){
        console.log(error)
    }else{
        console.log("mongoose connection is successful")
    }
})

app.listen(PORT, function(){
    console.log("Listening on port:" + PORT)
});

