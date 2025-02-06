import jwt from "jsonwebtoken";
import {ITokenSigningService} from "./ITokenSigningService";

export class BearerTokenSigningService implements ITokenSigningService {

    private readonly private_key: string;

    public constructor(private_key: string) {
        this.private_key = private_key;
    }

    public validateToken(token: string): boolean {
        return BearerTokenSigningService.verifyBearerToken(token, this.private_key);
    }

    public signToken(token: object) : string {
        return jwt.sign(token, this.private_key, { algorithm: 'HS256' });
    }


    private static verifyBearerToken(token: string, p_key: string): boolean {

        try {

            let BearerToken = token.split(' ')[1];
            jwt.verify(BearerToken, p_key)
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public static containsAuthHeader (req: any): boolean {
        return req.headers.c
    }

}