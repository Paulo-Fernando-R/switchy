export default interface Auth {
    accesToken: string;
    refreshToken: string;
    accesTokenExpiresAtUtc: Date;
}
