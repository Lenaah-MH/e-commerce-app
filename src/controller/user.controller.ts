import { Request, Response } from 'express';
import { HttpStatusCode } from '../utils/http';
import {
    findUserByIdService,
    retrieveUserListService,
    updateUserService,
} from '../service/user.service';
import { UpdateUserType } from '../types/userType';
import { TypedRequestBody } from 'zod-express-middleware';
import { updateUserSchema } from '../zod/user.schema';

export const updateUserHandler = async (
    req: TypedRequestBody<typeof updateUserSchema>,
    res: Response
) => {
    const user = {
        id: req.params.id,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    } as UpdateUserType;

    await updateUserService(user);
    return res.status(HttpStatusCode.OK).json({ message: 'User updated' });
};

export const retrieveUserListHandler = async (req: Request, res: Response) => {
    const users = await retrieveUserListService();
    return res.status(HttpStatusCode.OK).json(users);
};

export const getCurrentUserHandler = async (req: Request, res: Response) => {
    const user = await findUserByIdService(res.locals.user.userId);
    return res.status(HttpStatusCode.OK).json(user);
};

// export const verifyUserHnadler =
//     async (req: Request, res: Response, next: NextFunction) => {
//         const { id, verificationCode } = req.params;
//         return res.status(HttpStatusCode.OK).json({ message: 'User verified' });
//     };
