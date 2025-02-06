import jwt from "jsonwebtoken";
import ITokenService from "../../InterfaceAdapters/ITokenService";

export class TokenSigningService implements ITokenService{

    private readonly _private_key: string;
    private readonly _exportation_time_seconds: number;
    private readonly _signing_algorithm: jwt.Algorithm = 'HS256';

    constructor(private_key: string, exportation_time: number) {
        this._private_key = private_key;
        this._exportation_time_seconds = exportation_time;
    }

    public decodeToken(token: string){
        return jwt.decode(token);
    }

    public verifyToken (authHeader: string): boolean {
        return TokenSigningService.verifyBearerToken(authHeader, this._private_key);
    }

    public generateToken (payload : object ) : string {
        return jwt.sign(payload, this._private_key, { algorithm : this._signing_algorithm, expiresIn: this._exportation_time_seconds});
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