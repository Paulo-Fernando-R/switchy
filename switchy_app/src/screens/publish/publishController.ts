import CreatePostCase from "../../cases/createPostCase/createPostCase";

export default class PublishController {
    async createPost(content: string) {
        await new CreatePostCase().execute(content);
    }

    async handleSucess(
        setSnackBar: React.Dispatch<React.SetStateAction<boolean>>,
        navigate: () => void,
        setText: React.Dispatch<React.SetStateAction<string>>
    ) {
        setText("");
        setSnackBar(true);
        await new Promise((resolve) => {
             setTimeout(() => {
                navigate()
                resolve(true)
             }, 2000);
        })
       
        navigate();
        
    }

    async handleError(setSnackBar: React.Dispatch<React.SetStateAction<boolean>>) {
        setSnackBar(true);
    }
}
