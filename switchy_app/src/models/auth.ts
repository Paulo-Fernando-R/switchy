export default interface Auth {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAtUtc: Date;
}
