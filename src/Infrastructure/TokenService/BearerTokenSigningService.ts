import jwt from "jsonwebtoken";
import ITokenProvider from "../../InterfaceAdapters/ITokenProvider.js";

export class BearerTokenSigningService implements ITokenProvider{

    private readonly _private_key: string;
    private readonly _exportation_time_seconds: number;
    private readonly _signing_algorithm: jwt.Algorithm;
    private readonly _issuer: string;
    private readonly _audience: string;

    constructor(private_key: string, exportation_time: number, algorithm: jwt.Algorithm, issuer : string, audience : string ) {
        this._private_key = private_key;
        this._exportation_time_seconds = exportation_time;
        this._signing_algorithm = algorithm;
        this._issuer = issuer;
        this._audience = audience;
    }

    public decodeToken(token: string){
        return jwt.decode(token);
    }

    public verifyToken (authHeader: string): boolean {
        return BearerTokenSigningService.verifyBearerToken(authHeader, this._private_key);
    }

    public generateToken (payload : object ) : string {
        return jwt.sign(payload, this._private_key, { algorithm : this._signing_algorithm,
            expiresIn: this._exportation_time_seconds, issuer: this._issuer, audience: this._audience});
    }

    private static verifyBearerToken(authorizationHeader: string, p_key : string): boolean {

        let BearerToken = authorizationHeader.split(' ')[1];

        try {
            jwt.verify(BearerToken, p_key)
            return true;
        } catch (e) {
            return false;
        }

    }
}