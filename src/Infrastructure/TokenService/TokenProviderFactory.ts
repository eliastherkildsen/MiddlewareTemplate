import ITokenProvider from "../../InterfaceAdapters/ITokenProvider.js";
import {BearerTokenSigningService} from "./BearerTokenSigningService.js";
import logger from "../Logger/logger";

export enum EProviders {
    "login_token"
}

interface ITokenProviderFactory {
    provider: EProviders;
    secretKey?: string;
    issuer?: string;
    audience?: string;
}

export default class TokenProviderFactory {

    private static readonly LOGIN_TOKEN_EXPIRATION_TIME = 3600;

    public static CreateFactory(configuration: ITokenProviderFactory) : ITokenProvider {

        if (configuration.provider == EProviders.login_token) {

            if (!configuration.issuer) {
                throw new Error("Issuer has not been defined. please pass the issuer in the constructor.")
            }

            if (!configuration.audience) {
                throw new Error("Audience has not been defined. please pass the audience in the constructor.")
            }

            return new BearerTokenSigningService(configuration.secretKey, TokenProviderFactory.LOGIN_TOKEN_EXPIRATION_TIME,
                "HS256", configuration.issuer, configuration.audience)
        }

        // fail safe...
        throw new Error(`Provider ${configuration.provider} is not supported.`);

    }

}