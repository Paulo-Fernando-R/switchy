export default class SignInResponse {
    accessToken: string = '';
    refreshToken: string = '';
    accessTokenExpiresAtUtc: Date = new Date();
}