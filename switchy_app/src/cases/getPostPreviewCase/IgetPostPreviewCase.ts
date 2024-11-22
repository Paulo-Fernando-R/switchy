import Preview from "../../models/preview";

export default interface IgetPostPreviewCase {
    execute(url: string): Promise<Preview>
}