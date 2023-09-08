var express=require("express")
var bodyparser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://NaniPasupuleti:9505785028@cluster0.aqnmbqs.mongodb.net/?retryWrites=true&w=majority')
var db=mongoose.connection;
 
db.on('error',()=>console.log("Error occured"))
db.once('open',()=>console.log("Connected Successfully"))

app.post("/signup",(req,res)=>{
    var Fname=req.body.Fname;
    var Lname=req.body.Lname;
    var email=req.body.email;
    var password=req.body.password;

    var data={
        "Fname":Fname,
        "Lname":Lname,
        "email":email,
        "password":password
    }
    db.collection('SignUp').insertOne(data,(err,collection)=>
    {
        if(err)
        {
            throw err;
        }
        console.log("Recoed Inserted Successfully");
    });
    return res.redirect('signup.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-accesss-Allow-Origin":'*'
    })
    return res.redirect('mainPage.html');
}).listen(3000);


console.log("Listening on PoRt 3000")