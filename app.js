const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT =  process.env.PORT || 5000;
console.log("PORT is ==> " , PORT);

app.get('/api',(req,res) => {   //http://localhost:5000/api ==> will output ==> { "message": "Welcome To The API" }
  res.json({
    message: 'Welcome To The API' 
  });
});


app.post('/api/login' , (req,res) => {   //http://localhost:5000/api/login ==> will generate token 
  const user = {     //Mock User
    id: 1,
    username : 'swatantra sinha',
    email: 'swatantrasinha15aug@gmail.com'
  }

      jwt.sign({user:user} , 'secretkey' , (err,token) => {
          res.json({
            token:token
          });
      });
});

app.post('/api/posts', verifyToken , (req,res) => {   // http://localhost:5000/api/posts
  console.log(' inside of app.post for ==> /api/posts');
  console.log(' req.token in app.post is => ', req.token); //req.token is already set in verifyToken function
  jwt.verify(req.token, 'secretkey', (err,authData) => {
      if(err){
        console.log(' some error in app.post  ');
          res.sendStatus(403);
      }else{
        res.json({
          message: 'Post Created !!!' ,
          authData 
        });
      }
  });  
});


//Verify Token - middleware function in app.post
function verifyToken(req,res,next){
  console.log('inside verifyToken !!!');
  const bearerHeader= req.headers['authorization'];  //get auth header value
  console.log('bearerHeader ' , bearerHeader);
/* Format of token is :
   Authorization : Bearer <access_token>
   now to pull token out of this we will do below :      */

     if(typeof bearerHeader !== 'undefined'){   //check if undefined        
    const bearer = bearerHeader.split(' ');      //Split at the space so token will be @ index 1
    const bearerToken = bearer[1];
    console.log('bearerToken in verifyToken function is : ' , bearerToken);
    req.token=bearerToken;
    next();  //Next Middleware
     }else{
       console.log('some error in verifyToken function .... !!!');
       res.sendStatus(403);   //Forbidden
     }   

}

app.listen(PORT , () =>{
  console.log('Server is running on port => ' + PORT );
});