import { Router } from 'express';
import { getUsers, getUserByID, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';

const router = Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getUserByID).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

export default router;