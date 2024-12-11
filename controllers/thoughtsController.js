 // import user and thought models
 import { User, Thought } from '../models';

 module.exports = {
    // get thoughts
    getThoughts(req, res) {
        Thought.find()
        .then(thought => thought ? res.json(thought) : res.status(404).json({ message: 'No thoughts found' }))
        .catch(err => res.status(500).json(err));
    },
    // get thought by id
    getThoughtsById(req, res) {
        Thought.findById(req.params.id)
        .then(thought => thought ? res.json(thought) : res.status(404).json({ message: 'No thought found with this id' }))
        .catch(err => res.status(500).json(err));
    },
    // create thought
    createThought(req, res) {
        Thought.create(req.body)
        .then(thought => {
            return User.findByIdAndUpdate(
                req.body.userId,
                { $addToSet : { thoughts: thought._id } },
                { new: true }
            );
        })
        .then(user => user ? res.json(user) : res.status(404).json({ message: 'No user found with this id' }))
        .catch(err => res.status(500).json(err));
    },
    // update thought
    updateThought(req, res) {
        Thought.findByIdAndUpdate(req.params.thoughtId)
        .then(thought => thought ? res.json(thought) : res.status(404).json({ message: 'No thought found with this id' }))
        .catch(err => res.status(500).json(err));
    },
    // delete thought
    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.thoughtId)
        .then(thought => thought ? User.findByIdAndUpdate(
            thought.userId,
            { $pull : { thoughts: thought._id } },
            { new: true }
        ) : res.status(404).json({ message: 'No thought found with this id' }))
        .then(user => user ? res.json(user) : res.status(404).json({ message: 'No user found with this id' }))
        .catch(err => res.status(500).json(err));
    },
};