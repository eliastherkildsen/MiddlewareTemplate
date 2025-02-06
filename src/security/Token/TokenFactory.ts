import ITokenProvider from "../../InterfaceAdapters/ITokenProvider";
import {BearerTokenSigningService} from "./BearerTokenSigningService.js";

export enum EProviders {
    "login_token"
}

export default class TokenFactory {

    public static CreateFactory(provider: EProviders, secretKey: string) : ITokenProvider {

        if (provider == EProviders.login_token) {
            return new BearerTokenSigningService(secretKey, 3600, "HS256")
        }

        // fail safe...
        throw new Error(`Provider ${provider} is not supported.`);

    }

}