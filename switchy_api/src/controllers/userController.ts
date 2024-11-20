import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository/userRepository";
import { StatusCodes } from "../utils/status_codes";
import IUserRepository from "../repositories/userRepository/IuserRepository";
import SignUpCase from "../domain/user/cases/signUpCase";
import EncryptServiceBcrypt from "../services/encrypt/encryptService";
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
import JwtTokenService from "../services/token/jwtTokenService";
import ITokenService from "../services/token/itokenService";
import GetUserByEmailCase from "../domain/user/cases/getUserByEmailCase";
import GeneratePasswordService from "../services/crypto/generatePasswordService";
import IGeneratePasswordService from "../services/crypto/igeneratePasswordService";
import SendRecoveryPasswordEmailCase from "../domain/user/cases/sendRecoveryPasswordEmailCase";
import { RecoveryEmail } from "../services/smtp/recoveryEmail";

export default class UserController {
    private userRepository: IUserRepository;
    private signUpCase: SignUpCase;
    private encryptService: EncryptServiceBcrypt;
    private searchUserCase: SearchUserCase;
    private getUserByIdCase: GetUserByIdCase;
    private updateUserCase: UpdateUserCase;
    private changeUserPasswordCase: ChangeUserPasswordCase;
    private followUserCase: FollowUserCase;
    private unfollowUserCase: UnfollowUserCase;
    private updateUsernameCase: UpdateUsernameCase;
    private generateTokenFromUserCase: GenerateTokenFromUserCase;
    private tokenService: ITokenService;
    private getUserByEmailCase: GetUserByEmailCase;
    private generatePaswordService: IGeneratePasswordService;
    private recoveryEmail: RecoveryEmail;
    private sendRecoveryPasswordEmailCase: SendRecoveryPasswordEmailCase;

    constructor() {
        this.userRepository = new UserRepository();
        this.encryptService = new EncryptServiceBcrypt();
        this.tokenService = new JwtTokenService();
        this.signUpCase = new SignUpCase(this.userRepository, this.encryptService);
        this.searchUserCase = new SearchUserCase(this.userRepository, this.encryptService);
        this.getUserByIdCase = new GetUserByIdCase(this.userRepository);
        this.updateUserCase = new UpdateUserCase(this.userRepository);
        this.changeUserPasswordCase = new ChangeUserPasswordCase(this.userRepository, this.encryptService);
        this.followUserCase = new FollowUserCase(this.userRepository);
        this.unfollowUserCase = new UnfollowUserCase(this.userRepository);
        this.updateUsernameCase = new UpdateUsernameCase(this.userRepository);
        this.generateTokenFromUserCase = new GenerateTokenFromUserCase(this.tokenService);
        this.getUserByEmailCase = new GetUserByEmailCase(this.userRepository);
        this.generatePaswordService = new GeneratePasswordService();
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
            }
            else throw error;
        }
    }

    async getInfo(req: Request, res: Response) {
        try {
            const userInfo = await new GetUserByIdCase(this.userRepository).execute(req.userId);

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
            const userInfo = await new GetUserByIdCase(this.userRepository).execute(userId);

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
            await this.updateUsernameCase.execute(userId, username);

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
            if(user){
                const newPassword = this.generatePaswordService.generateHex(13);
                console.log(newPassword)
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
}
