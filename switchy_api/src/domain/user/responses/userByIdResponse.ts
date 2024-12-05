export default interface IUserByIdResponse {
    id: string;
    name: string;
    email: string;
    description: string | null;
    userName: string;
    createdAt: Date;
    following: { userId: string }[];
    followers: { userId: string }[];
}