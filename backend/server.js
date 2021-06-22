const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const data = require('./data/people.json');
const Contact = require("./models/contactModel");
const favicon = require("serve-favicon");
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 5000

// Init middleware
app.use(express.urlencoded({ extended:true }));

// parse application/json
app.use(express.json());

app.use(favicon(path.join(__dirname,'public','favicon.ico')));

app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use("/images" , express.static(__dirname + "/images"));

app.use(bodyParser.urlencoded ({ extended:true }));
app.use(bodyParser.json());


// app.get("/",(req,res)=>{
//     //res.send(`get request is sending on port ${PORT}`);
//     res.json(data);
// });

//using Paramter

// app.get("/user/:id",(req,res)=>{

//     console.log(req.params.id);
//     let user = Number(req.params.id);
    
//     console.log(user);
//     console.log(data[user]);

//     res.send(data[user]);
// }
// );

// CRUD Operation Contact Routes

//@path / contact
//@desc adding new contact
//@method post
//@access public

app.route("/contact").post((req,res) => {
    let newContact = new Contact(req.body);

    newContact.save((err,contact) => {
        if(err)
        {
            res.send(err);
        }
        res.json(contact);
    });
});

//@path / contact
//@desc get all contacts
//@method get
//@access public

app.route("/contact").get((req,res) => {

    Contact.find({}, (err,contact) => {
        if(err)
        {
            res.send(err);
        }
        res.json(contact);
    });
});


//@path / contact/:contactId
//@desc get all contact by Id
//@method get
//@access public

app.route("/contact/:contactId").get((req,res) => {
    
    Contact.findById(req.params.contactId, (err,contact) => {
        if(err)
        {
            res.send(err);
        }
        res.json(contact);
    });
});


//@path / contact/:contactId
//@desc edit contact by Id
//@method put
//@access public

app.route("/contact/:contactId").put((req,res) => {
    Contact.findOneAndUpdate(
        {_id:req.params.contactId}, req.body,
        {new:true, useFindAndModify:false},
        (err,contact) => {
        if(err)
        {
            res.send(err);
        }
        res.json(contact);
    });
});


//@path / contact/:contactId
//@desc delete all contact by Id
//@method delete
//@access public

app.route("/contact/:contactId").delete((req,res) => {
    Contact.deleteOne({_id:req.params.contactId}, (err,message) => {
        if(err)
        {
            res.send(err);
        }
        res.json({ message: "Contact Sucessfully Deleted..."});
    });
});

// CRUD Operation Contact Routes End

// Multiple Function

app.get("/user/:id",(req,res,next)=>{

    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    res.send(data[user]);
    next();
},(res,req)=> {
    console.log("The Second Function");
}
);

// app.get("/item",(req,res)=>{
//    //res.end();
//    res.redirect("https://www.google.com") // Redirect Another Page
// });

// app.post("/item",(req,res)=>{
//     res.send(`post request is sending on port ${PORT}`);
// });

// app.put("/newItem",(req,res)=>{
//     res.send(`put request is sending on port ${PORT}`);
// });

// app.delete("/newItem",(req,res)=>{
//     res.send(`delete request is sending on port ${PORT}`);
// });

//Multiple Method in single path

app.route("/item")
    .get((req,res) => {
        res.send(`get request is sending on port ${PORT}`);
    })
    .post((req,res)=> {
        res.send(`post request is sending on port ${PORT}`);
    })
    .put((req,res)=> {
        res.send(`put request is sending on port ${PORT}`);
    })
    .delete((req,res) => {
        res.send(`delete request is sending on port ${PORT}`);
    });


    app.route("/profiles")
    .get((req,res) => {
        //res.send(`get request is sending on port ${PORT}`);
        //console.log(`Request from ${req.originalUrl}`);
        //console.log(`Request type ${req.method}`);
        //throw new Error();
        res.json(data);

    })
    .post((req,res)=> {
        console.log(req.body);
        res.send(req.body);
    })
    .put((req,res)=> {
        res.send(`put request is sending on port ${PORT}`);
    })
    .delete((req,res) => {
        res.send(`delete request is sending on port ${PORT}`);
    });

// Error handling...

app.use((err,req,res,next) => {
    console.log(err.stack);
    res.status(500).send(`Red Alert ${err.stack}`);
})    

app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
