import { parentPort } from "worker_threads";

import DeleteUserAccountCase from "../cases/deleteUserAccountCase";
import GetUserByIdCase from "../cases/getUserByIdCase";
import { UserRepository } from "../../../repositories/userRepository/userRepository";
import { PostRepository } from "../../../repositories/postRepository/postRepository";

const getUserByIdCase = new GetUserByIdCase(new UserRepository());
const deleteUserAccountCase = new DeleteUserAccountCase(new PostRepository(), new UserRepository());

async function main() {
    if (parentPort) {
        parentPort?.on("message", async (userId: string) => {
            console.log("Delete user worker created");

            try {
                await getUserByIdCase.execute(userId);
                await deleteUserAccountCase.execute(userId);
                const result = `Account delete process is finished for user: ${userId}`;
                parentPort?.postMessage(result);
            } catch (error) {
                parentPort?.postMessage(error);
            }
        });
    } else {
        console.log("Delete user worker not created");
    }
}

main();
