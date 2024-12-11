// import user and thought models
import User from '../models/users.js';
import Thought from '../models/thoughts.js';

export const getThoughts = (res) => {
    Thought.find()
    .then(thoughts => res.json(thoughts))
    .catch(err => res.status(500).json(err));
};

export const getThoughtsById = (req, res) => {
    Thought.findById(req.params.id)
    .then(thought => thought ? res.json(thought) : res.status(404).json({ message: 'No thought found with this id' }))
    .catch(err => res.status(500).json(err));
};

export const createThought = (req, res) => {
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
};

export const updateThought = (req, res) => {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
    .then(thought => thought ? res.json(thought) : res.status(404).json({ message: 'No thought found with this id' }))
    .catch(err => res.status(500).json(err));
};

export const deleteThought = (req, res) => {
    Thought.findByIdAndDelete(req.params.thoughtId)
    .then(thought => thought ? User.findByIdAndUpdate(
        thought.userId,
        { $pull : { thoughts: thought._id } },
        { new: true }
    ) : res.status(404).json({ message: 'No thought found with this id' }))
    .then(user => user ? res.json(user) : res.status(404).json({ message: 'No user found with this id' }))
    .catch(err => res.status(500).json(err));
};

export const addReaction = (req, res) => {
    Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { new: true }
    )
    .then(thought => thought ? res.json(thought) : res.status(404).json({ message: 'No thought found with this id' }))
    .catch(err => res.status(500).json(err));
};

export const removeReaction = (req, res) => {
    Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
    )
    .then(thought => thought ? res.json(thought) : res.status(404).json({ message: 'No thought found with this id' }))
    .catch(err => res.status(500).json(err));
};