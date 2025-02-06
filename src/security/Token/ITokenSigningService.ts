export interface ITokenSigningService {
    validateToken(token: string): boolean;
    signToken(token: object): string;
}