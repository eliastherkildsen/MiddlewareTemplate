import ITokenProvider from "../../InterfaceAdapters/ITokenProvider.js";
import {BearerTokenSigningService} from "./BearerTokenSigningService.js";

export enum EProviders {
    "login_token"
}

export default class TokenProviderFactory {

    private static readonly LOGIN_TOKEN_EXPIRATION_TIME = 3600;

    public static CreateFactory(provider: EProviders, secretKey: string) : ITokenProvider {

        if (provider == EProviders.login_token) {
            return new BearerTokenSigningService(secretKey, TokenProviderFactory.LOGIN_TOKEN_EXPIRATION_TIME, "HS256")
        }

        // fail safe...
        throw new Error(`Provider ${provider} is not supported.`);

    }

}