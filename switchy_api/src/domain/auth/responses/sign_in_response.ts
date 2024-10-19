export default class SignInResponse {
    access_token: string = '';
    refresh_token: string = '';
    access_token_expires_at_utc: Date = new Date();
}