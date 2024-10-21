export default interface ICreateCommentCase {
    execute(content: string, parentId: string): Promise<void>;
}
