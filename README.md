in command prompt type "nodemon" and then Open POSTMAN
==============================================================================================

In Postman if we do "GET" operation with ==> http://localhost:5000/api , 
we will receive response as below :
{
    "message": "Welcome To The API"
}

-----------------------------------------------------------------------------------------------

In POSTMAN, if we do "POST" request with ==> http://localhost:5000/api/login , we will receive token 
and this token will be used in the below request  :

-----------------------------------------------------------------------------------------------

In Postman if we do "POST" Operation with ==>  http://localhost:5000/api/posts , 
In Header tab, we should put
        ==>  key as "Authorization" and
        ==> value as Bearer <token>    
                        (Note : This <token> value will be from above POST request "http://localhost:5000/api/login ")

-----------------------------------------------------------------------------------------------