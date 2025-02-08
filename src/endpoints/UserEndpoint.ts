import {IUser} from "../models/User";
import ITokenService from "../InterfaceAdapters/ITokenProvider";
import ITokenProvider from "../InterfaceAdapters/ITokenProvider";

export class UserEndpoint {

    private static users : Map<string, IUser> = new Map<string, IUser>
    private _tokenProvider : ITokenService;

    public constructor(TokenProvider : ITokenProvider) {
        this._tokenProvider = TokenProvider;
    }

    public login(user : IUser, res : any) {

        const isValid = this.authenticateUser(user);
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

    public register(user : IUser, res : any) {
        if (this.isUserExist(user)) {
            return res.status(409).json(
                {
                    "message": "User already exist"
                }
            )
        }

        UserEndpoint.users.set(user.username, user);
        return res.status(201).json({
            "massage" : "User created",
            "user" : user
        })
    }

    private isUserExist(user : IUser) : boolean {
        return UserEndpoint.users.has(user.username);
    }

    private authenticateUser(user : IUser) : boolean {

        const userFound = UserEndpoint.users.get(user.username);
        if (!userFound) {
            return false;
        }

        return userFound.password == user.password && userFound.username == user.username;

    }



}