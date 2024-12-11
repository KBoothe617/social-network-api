// import user and thought models
import User from '../models/users.js';
import Thought from '../models/thoughts.js';

// export models
module.exports = {
    // get all users
    getUsers(res) {
        User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
    },
    // get single user by id
    getUserByID(req, res) {
        User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends')
        .then(user => user ? res.json(user) : res.status(404).json({ message: 'No user found with this id!' }))
        .catch(err => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
    },
    // update user by id
    updateUser(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(user => user ? res.json(user) : res.status(404).json({ message: 'No user found with this id!' }))
        .catch(err => res.status(500).json(err));
    },
    // delete user by id
    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.id)
        .then(user => user ? Thought.deleteMany({ _id: { $in: user.thoughts } }) : res.status(404).json({ message: 'No User found with this id!' }))
        .then(() => res.json({message: 'User and associated thoughts deleted!' }))
        .catch(err => res.status(500).json(err));
    },
    // add a friend to a user's friend list
    addFriend(req, res) {
        User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.friendId } }, { new: true })
        .then(user => user ? res.json(user) : res.status(404).json({ message: 'No user found with this id!' }))
        .catch(err => res.status(500).json(err));
    },
    // remove a friend from a user's friend list
    removeFriend(req, res) {
        User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.friendId } }, { new: true })
        .then(user => user ? res.json(user) : res.status(404).json({ message: 'No user found with this id!' }))
        .catch(err => res.status(500).json(err));
    },
};