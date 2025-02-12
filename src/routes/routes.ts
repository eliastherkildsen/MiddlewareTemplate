import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import {CRUDProduct} from '../endpoints/CRUDProducts.js';
import {UserEndpoint} from '../endpoints/UserEndpoint.js';
import fileUpload from "express-fileupload";
import {IUser} from "../models/User";
import ITokenProvider from "../InterfaceAdapters/ITokenProvider";
import TokenProviderFactory, {EProviders} from "../Infrastructure/TokenService/TokenProviderFactory.js";
import morganMiddleware from "../Infrastructure/Logger/morganMiddleware.js";


dotenv.config({ path: 'config/middleware.env' });

const routes = express();
const LoginToken : ITokenProvider = TokenProviderFactory.CreateFactory({
    "provider": EProviders.login_token,
    "audience": process.env.AUDIENCE,
    "issuer": process.env.ISSUER,
    "secretKey": process.env.TOKEN_SCRECT as string,
});



routes.use(cors());
routes.use(express.static('public'));
routes.use(fileUpload())
routes.use(morganMiddleware)

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

    try {

        const user : IUser = req.body
        return new UserEndpoint(LoginToken).login(user, res)

    } catch (err) {
        return res.status(400).json({message: "malformed user attributes"})
    }
})

routes.post('/api/register', (req, res) => {
    try {
        const user : IUser = req.body
        return new UserEndpoint(LoginToken).register(user, res)
    } catch (err) {
        return res.status(400).json({message: "malformed user attributes"})
    }
})

// Vores (eneste) endpoint som der kan postes til...
routes.post('/api/products',  (req:any,res:any) => {
    return CRUDProduct.insert(req,res);
});


export {routes}