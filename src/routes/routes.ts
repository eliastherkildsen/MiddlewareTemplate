import  * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { CRUDProduct } from '../endpoints/CRUDProducts.js';
import { UserEndpoint } from '../endpoints/UserEndpoint.js';
import fileUpload from "express-fileupload";
import {TokenSigningService} from "../security/Token/tokenSigningService.js";
import ITokenService from "../InterfaceAdapters/ITokenService.js";
import {IUser} from "../models/User";


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
        image.mv('upload\\' + image.name);
    }

    res.sendStatus(200);
});

routes.post('/api/login', (req, res) => {

    const LOGIN_TOKEN_EXPIRED_TIME_SECONDS = 3600;

    try {
        const user : IUser = req.body
        return new UserEndpoint(new TokenSigningService(process.env.TOKEN_SECRET, LOGIN_TOKEN_EXPIRED_TIME_SECONDS)).login(user, res)
    } catch (err) {
        return res.status(400).json({message: "user attributes"})
    }
})


// Vores (eneste) endpoint som der kan postes til...
routes.post('/api/products',  (req:any,res:any) => {
    return CRUDProduct.insert(req,res);
});

// Get all men vi vil tjekke for at der er et korrekt auth token
routes.get('/api/products', (req:any,res:any) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({message: "Authorization header missing"});
    }

    // Forventet format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({message: "Token missing in Authorization header"});
    }

    console.log(token);
    const Tokenservice : ITokenService = new TokenSigningService(process.env.TOKEN_SECRET, 10);

    let payload = {
        "name": "Elias",
    }

    console.log(Tokenservice.generateToken(payload))


    const isValid = Tokenservice.verifyToken(authHeader)
    return isValid ? res.status(200).json({message: "Authenticated Login"}) : res.status(401).json({message: "Invalid token"});


})



export {routes}