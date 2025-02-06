import {IUser} from "../models/User";
import ITokenService from "../InterfaceAdapters/ITokenProvider";
import ITokenProvider from "../InterfaceAdapters/ITokenProvider";

export class UserEndpoint {

    private users : Map<string, IUser>
    private _tokenProvider : ITokenService;

    constructor(TokenProvider : ITokenProvider) {
        this.users = new Map<string, IUser>();
        this._tokenProvider = TokenProvider;
        this.users.set("elias", {
            "username": "elias",
            "password": "123"
        })
    }

    public login(user : IUser, res : any) {

        const isValid = this.isLoginValid(user);
        if (!isValid) {
            return res.status(401).json(
                {
                    "message": "Invalid username or password"
                }
            )
        }

        const token = this._tokenProvider.generateToken(user);

        return res.status(201).json({
            "massage" : "Login success",
            "token" : token
        })
    }

    private isLoginValid(user : IUser) : boolean {

        const userFound = this.users.get(user.username);
        if (!userFound) {
            return false;
        }

        return userFound.password == user.password && userFound.username == user.username;

    }



}