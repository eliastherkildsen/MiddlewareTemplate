export default interface ITokenProvider {
    generateToken(payload: any): string;
    verifyToken(token: string): any;
    decodeToken(token: string): any;
}