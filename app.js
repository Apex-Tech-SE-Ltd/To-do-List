const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const day = require(__dirname + "/date.js");

app.use(bodyParser.urlencoded({extented: true}));

app.set('view engine', "ejs"); 

app.use(express.static("public"));

let items = [];
let workItems = [];

app.get("/", function(req, res) {

res.render("list", {listTitle: day.getDay(), newAddedActivities: items});
      
});

app.post("/", function(req, res) {

       
       if (req.body.list === "Work") {
           workItems.push(req.body.newActivity)  
           res.redirect("/work")   
        } else {
                items.push(req.body.newActivity);
                res.redirect("/");
        };

});

app.get("/work", function(req, res) {
        res.render("list", {listTitle: "Work List", newAddedActivities: workItems});
});

app.post("/work", function(req, res) {
        workItems.push(req.body.newListItem);
        res.redirect("/work");

});

app.get("/about", function(req, res) {
        res.render("about");
});

app.listen(3000, function(req, res) {
        console.log("Server is running on port 3000");
});