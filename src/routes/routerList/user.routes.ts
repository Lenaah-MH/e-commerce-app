import { Router } from 'express';
import { __DEV__ } from '../../utils/constants';
import { asyncController as async } from '../../middleware/asyncHandler';
import {
    getCurrentUserHandler,
    retrieveUserListHandler,
} from '../../controller/user.controller';
import { protect } from '../../middleware/auth';

const router = Router();

// @desc Get all users
// @route GET /api/v1/users
// @access Private
if (__DEV__) {
    router.get('/', async(retrieveUserListHandler));
}

// @desc Get Current User
// @route GET /api/v1/users/me
// @access Private
router.get('/me', protect('TOKEN'), async(getCurrentUserHandler));

// // @desc Update user
// // @route PUT /api/v1/users/:id
// // @access Private
// router.put('/:id', protect('TOKEN'), authorize('ADMIN'),
//     validateBody(updateUserSchema), async(updateUserHandler));

// // @desc Deactivate user
// // @route put /api/v1/users/deactivate/:id
// // @access Private
// router.put(
//     '/deactivate/:id',
//     protect('TOKEN'), authorize('ADMIN'),
//     validateParams(deactiveUserSchema),
//     async(deactivateUserHandler)
// );

// // @desc Verify user
// // @route GET /api/v1/users/:id/:verificationCode
// // @access Public
// router.get('/:id/:verificationCode', verifyUserHnadler);

export default router;
