// Desc: user routes
const router = require('express').Router();
import { getUsers, getUserByID, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getUserByID).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;