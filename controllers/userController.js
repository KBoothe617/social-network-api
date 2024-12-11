// import user and thought models
import { User, Thought } from '../models';

// export models
module.exports = {
    // get all users
    getUsers(req, res) {
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
};