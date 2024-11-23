export default interface IDeletePostCase {
    execute(postId: string): Promise<void>
}