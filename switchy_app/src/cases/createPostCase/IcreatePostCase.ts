export default interface ICreatePostCase {
    execute(content: string, parentId: string): Promise<void>;
}
