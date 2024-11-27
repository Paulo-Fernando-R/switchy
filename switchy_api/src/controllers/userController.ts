import { Request, Response } from "express";
import { StatusCodes } from "../utils/status_codes";
import SignUpCase from "../domain/user/cases/signUpCase";
import SignUpRequest from "../domain/user/requests/signUpRequest";
import {
    SamePasswordError,
    UserEmptyFieldsError,
    UserError,
    UserNotFoundError,
    UserInvalidEmailError,
    UserInvalidUsernameError,
} from "../domain/user/errors/userErrors";
import GetUserByIdCase from "../domain/user/cases/getUserByIdCase";
import SearchUserCase from "../domain/user/cases/searchUserCase";
import UpdateUserCase from "../domain/user/cases/updateUserCase";
import ChangeUserPasswordCase from "../domain/user/cases/changePasswordCase";
import FollowUserCase from "../domain/user/cases/followUserCase";
import UnfollowUserCase from "../domain/user/cases/unfollowUserCase";
import UpdateUsernameCase from "../domain/user/cases/updateUsernameCase";
import GenerateTokenFromUserCase from "../domain/auth/cases/generateTokenFromUserCase";
import GetUserByEmailCase from "../domain/user/cases/getUserByEmailCase";
import GeneratePasswordService from "../services/crypto/generatePasswordService";
import IGeneratePasswordService from "../services/crypto/igeneratePasswordService";
import SendRecoveryPasswordEmailCase from "../domain/user/cases/sendRecoveryPasswordEmailCase";
import { RecoveryEmail } from "../services/smtp/recoveryEmail";
import UpdateUserPostsCase from "../domain/post/cases/updateUserPostsCase";
import { IUser } from "../models/user";
import container from "../injection";
import DeleteUserAccountCase from "../domain/user/cases/deleteUserAccountCase";
import { Worker } from "worker_threads";
import path from "path";

export default class UserController {
    private signUpCase: SignUpCase;
    private searchUserCase: SearchUserCase;
    private getUserByIdCase: GetUserByIdCase;
    private updateUserCase: UpdateUserCase;
    private changeUserPasswordCase: ChangeUserPasswordCase;
    private followUserCase: FollowUserCase;
    private unfollowUserCase: UnfollowUserCase;
    private updateUsernameCase: UpdateUsernameCase;
    private generateTokenFromUserCase: GenerateTokenFromUserCase;
    private getUserByEmailCase: GetUserByEmailCase;
    private generatePaswordService: IGeneratePasswordService;
    private recoveryEmail: RecoveryEmail;
    private sendRecoveryPasswordEmailCase: SendRecoveryPasswordEmailCase;
    private updateUserPostsCase: UpdateUserPostsCase;
    private deleteUserAccountCase: DeleteUserAccountCase;

    constructor() {
        this.signUpCase = container.get<SignUpCase>("SignUpCase");
        this.searchUserCase = container.get<SearchUserCase>("SearchUserCase");
        this.getUserByIdCase = container.get<GetUserByIdCase>("GetUserByIdCase");
        this.updateUserCase = container.get<UpdateUserCase>("UpdateUserCase");
        this.changeUserPasswordCase = container.get<ChangeUserPasswordCase>("ChangeUserPasswordCase");
        this.followUserCase = container.get<FollowUserCase>("FollowUserCase");
        this.unfollowUserCase = container.get<UnfollowUserCase>("UnfollowUserCase");
        this.updateUsernameCase = container.get<UpdateUsernameCase>("UpdateUsernameCase");
        this.generateTokenFromUserCase = container.get<GenerateTokenFromUserCase>("GenerateTokenFromUserCase");
        this.getUserByEmailCase = container.get<GetUserByEmailCase>("GetUserByEmailCase");
        this.generatePaswordService = container.get<GeneratePasswordService>("GeneratePasswordService");
        this.updateUserPostsCase = container.get<UpdateUserPostsCase>("UpdateUserPostsCase");
        this.deleteUserAccountCase = container.get<DeleteUserAccountCase>("DeleteUserAccountCase");

        // TODO: Refactor
        this.recoveryEmail = new RecoveryEmail();
        this.sendRecoveryPasswordEmailCase = new SendRecoveryPasswordEmailCase(this.recoveryEmail);
    }

    async signUp(request: Request, response: Response) {
        try {
            const { name, email, password, userName } = request.body;
            const signUpRequest = { name, email, password, userName } as SignUpRequest;

            const newUser = await this.signUpCase.execute(signUpRequest);
            const res = await this.generateTokenFromUserCase.execute(newUser);

            response.type("application/json").status(StatusCodes.Created).send(res);
        } catch (error) {
            if (error instanceof UserEmptyFieldsError) {
                response.status(StatusCodes.BadRequest).send();
            } else if (error instanceof UserInvalidEmailError) {
                response.status(StatusCodes.InvalidEmail).send();
            } else if (error instanceof UserInvalidUsernameError) {
                response.status(StatusCodes.InvalidUsername).send();
            } else throw error;
        }
    }

    async getInfo(req: Request, res: Response) {
        try {
            const userInfo = await this.getUserByIdCase.execute(req.userId);

            res.type("application/json").status(StatusCodes.Ok).send(userInfo);
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                res.status(StatusCodes.NotFound).send();
                return;
            }

            throw ex;
        }
    }

    async getInfoById(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const userInfo = await this.getUserByIdCase.execute(userId);

            res.type("application/json").status(StatusCodes.Ok).send(userInfo);
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                res.status(StatusCodes.NotFound).send();
                return;
            }

            throw ex;
        }
    }

    async searchUser(req: Request, res: Response) {
        const { query } = req.params;
        try {
            const userInfo = await this.searchUserCase.execute(query);

            res.type("application/json").status(StatusCodes.Ok).send(userInfo);
        } catch (ex) {
            res.status(StatusCodes.InternalServerError).send();
        }
    }

    async update(req: Request, res: Response) {
        const { name, email, description } = req.body;
        const userId = req.userId;

        try {
            const user = await this.updateUserCase.execute(userId, name, email, description);

            var postUser: IUser = {
                id: user.id,
                name: user.name,
                userName: user.userName,
                email: user.email,
            };
            await this.updateUserPostsCase.execute(userId, postUser);

            return res.type("application/json").status(StatusCodes.Ok).send(user);
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                return res.status(StatusCodes.NotFound).send();
            } else if (ex instanceof UserInvalidEmailError) {
                return res.status(StatusCodes.BadRequest).send(ex.message);
            }
        }
    }

    async updateUsername(req: Request, res: Response) {
        const { username } = req.body;
        const userId = req.userId;

        try {
            var userUpdated = await this.updateUsernameCase.execute(userId, username);

            var user: IUser = {
                id: userUpdated.id,
                name: userUpdated.name,
                userName: userUpdated.userName,
                email: userUpdated.email,
            };
            await this.updateUserPostsCase.execute(userId, user);

            return res.type("application/json").status(StatusCodes.Ok).send();
        } catch (ex) {
            if (ex instanceof UserInvalidUsernameError) {
                return res.status(StatusCodes.BadRequest).send(ex.message);
            }
        }
    }

    async changePassword(req: Request, res: Response) {
        const { oldPassword, newPassword } = req.body;
        try {
            await this.changeUserPasswordCase.execute(req.userId, oldPassword, newPassword);
            return res.type("application/json").status(StatusCodes.Ok).send();
        } catch (ex) {
            if (ex instanceof UserEmptyFieldsError) {
                res.status(StatusCodes.BadRequest).send("Missing required fields.");
                return;
            }

            if (ex instanceof SamePasswordError) {
                res.status(StatusCodes.BadRequest).send("New password cannot be the same as previous.");
                return;
            }

            if (ex instanceof UserError) {
                res.status(StatusCodes.BadRequest).send(ex.message);
                return;
            }

            throw ex;
        }
    }

    async follow(req: Request, res: Response) {
        const { userId } = req.body;
        const id = req.userId;

        try {
            await this.getUserByIdCase.execute(userId);
            await this.getUserByIdCase.execute(id);

            this.followUserCase.execute(id, userId);

            return res.type("application/json").status(StatusCodes.Ok).send();
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                return res.status(StatusCodes.NotFound).send();
            }

            throw ex;
        }
    }

    async unfollow(req: Request, res: Response) {
        const { userId } = req.body;
        const id = req.userId;

        try {
            await this.getUserByIdCase.execute(userId);
            await this.getUserByIdCase.execute(id);

            await this.unfollowUserCase.execute(id, userId);

            return res.type("application/json").status(StatusCodes.Ok).send();
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                return res.status(StatusCodes.NotFound).send();
            }

            throw ex;
        }
    }

    async recoveryPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const user: any = await this.getUserByEmailCase.execute(email);
            if (user) {
                const newPassword = this.generatePaswordService.generateHex(13);
                console.log(newPassword);
                await this.changeUserPasswordCase.execute(user.id, user.password, newPassword);
                await this.sendRecoveryPasswordEmailCase.execute(user.email, newPassword);
                return res.type("application/json").status(StatusCodes.Ok).send();
            } else {
                return res.status(StatusCodes.NotFound).send("User not found with this email.");
            }
        } catch (ex) {
            console.log(ex);
            if (ex instanceof UserInvalidEmailError) {
                return res.status(StatusCodes.BadRequest).send("Invalid email.");
            }
            if (ex instanceof UserEmptyFieldsError) {
                return res.status(StatusCodes.BadRequest).send("Missing required fields.");
            }
            return res.status(StatusCodes.InternalServerError).send();
            //throw ex;
        }
    }

    async delete(req: Request, res: Response) {
        let userId = req.userId;

        try {
            // await this.getUserByIdCase.execute(userId);
            // await this.deleteUserAccountCase.execute(userId);

            // res.status(StatusCodes.Ok).send();
            const workerPath = path.resolve(__dirname, "../../dist/domain/user/workers/deleteUserWorker.js");
            const worker = new Worker(workerPath);
            worker.postMessage(userId);
            res.status(StatusCodes.Ok).send(`Account delete process is started form user: ${userId}`);

            worker.on("message", (message) => {
                console.log("Message from worker:", message);
            });

            worker.on("error", (error) => {
                console.error("Worker error:", error);
            });

            worker.on("exit", (code) => {
                console.log(`Worker stopped with exit code ${code}`);
            });
        } catch (err) {
            if (err instanceof UserNotFoundError) {
                res.status(StatusCodes.NotFound).send();
                return;
            }

            throw err;
        }
    }
}
