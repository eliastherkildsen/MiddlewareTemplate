import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { CRUDProduct } from '../endpoints/CRUDProducts.js';
import { CRUDUser } from '../endpoints/CRUDUser.js';
import fileUpload from "express-fileupload";
import {TokenSigningService} from "../security/tokenSigningService.js";


dotenv.config({ path: 'config/middleware.env' });

const routes = express();

routes.use(cors());
routes.use(express.static('public'));
routes.use(fileUpload())

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json())


// File uploads.
routes.post('/api/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    if ("mv" in image) {
        image.mv('./upload/' + image.name);
    }

    res.sendStatus(200);
});


// Vores (eneste) endpoint som der kan postes til...
routes.post('/api/products',  (req:any,res:any) => {
   return CRUDProduct.insert(req,res);
});

// USERS
routes.post('/api/users', (req:any,res:any) => {
    return CRUDUser.post(req,res);
})

routes.get('/api/users', (req:any,res:any) => {
    return CRUDUser.getAll(req,res);
})

routes.get('/api/users/:id', (req:any,res:any) => {
    return CRUDUser.get(req,res);
})

routes.delete('/api/users/:id', (req:any,res:any) => {
    return CRUDUser.delete(req,res);
})

// Samler alle andre routes op...
routes.get('*', (req:any,res:any) =>{
     return res.status(404).send('no such route');
});

const TokenService = new TokenSigningService(process.env.TOKEN_SECRET);

const claim = {
    "name" : "elias"
}

let signed_token = TokenService.signToken(claim);
console.log(signed_token);
console.log(TokenService.isAuthenticated(signed_token));

export {routes}


