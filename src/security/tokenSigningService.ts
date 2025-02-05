import jwt from "jsonwebtoken";

export class TokenSigningService {

    private readonly private_key: string;

    constructor(private_key: string) {
        this.private_key = private_key;
    }

    public isAuthenticated (token: string): boolean {

        // ensuring token contains auth header.
        if (!TokenSigningService.containsAuthHeader(token)) return false;
        return TokenSigningService.verifyBearerToken(token, this.private_key);
    }

    public signToken (token : object ) : string {
        return jwt.sign(token, this.private_key);
    }

    private static verifyBearerToken(token: string, p_key : string): boolean {

        let BearerToken = token.split(' ')[1];

        try {
            jwt.verify(BearerToken, p_key)
            return true;
        } catch (e) {
            return false;
        }

    }

    public static containsAuthHeader (req: any): boolean {
        return req.headers.authenticated
    }



}