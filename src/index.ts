import express from "express";
import createUser from "../apps/createUser" 
import "reflect-metadata";

const app = express();
const port = 8080; 
app.use(express.json())

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.header("Access-Control-Allow-Credentials", "true");     
    res.header("Access-Control-Allow-Methods", "POST");     
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});


// define a route handler for the default home page
app.post( "/", async ( req: any, res: any ) => {
    createUser(req.body).then((createUserResult)=>{
        res.status(createUserResult.status).send(createUserResult)
    }).catch((error)=>
        res.status(500).send("Oops! Algún error ha ocurrido en el servidor")
    )
    
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );