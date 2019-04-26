const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//mongoose.connect('mongodb+srv://admin:admin@cluster0-8tvqx.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

// Connect to the db
mongoose.connect('mongodb+srv://admin:admin@cluster0-8tvqx.mongodb.net/test?retryWrites=true',{useNewUrlParser: true}, function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

var userSchema = new mongoose.Schema({
    username:String,
    password:String
})

var User = mongoose.model('User',userSchema)

app.post('/register', function(req, res)  {
var user =new User({'username' : req.body.username,'password': req.body.password})

  user.save(function(err,savedUser){
     if(err)
       res.json({'message' : 'failure'})
       else
       res.json({'message': 'success'})
  })
    })

    app.get('/users', function(req, res)  {
        User.find({},function(error, users){
            res.json(users)
        } )
            })

app.post('/login', function(req, res)  {

if(req.body.username == "admin" && req.body.password == "admin")
  res.json ({ 'message' : 'success'})
  else
  res.json({ 'message' : 'failure'})
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))