 // import user and thought models
 import { User, Thought } from '../models';

 module.exports = {
    // get thoughts
    getThoughts(req, res) {
        Thought.find()
        .then(thought => thought ? res.json(thought) : res.status(404).json({ message: 'No thoughts found' }))
        .catch(err => res.status(500).json(err));
    },
};