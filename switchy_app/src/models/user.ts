export default interface User {
    name: string;
    email: string;
    userName: string;
    password?: string;
    id?: string;
    followers?: { userId: string }[];
    following?: { userId: string }[];
    description?: string;
}
