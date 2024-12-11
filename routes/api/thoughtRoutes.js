// Purpose: API routes for thoughts
const router = require('express').Router();
import { getThoughts, getThoughtsById, createThought, updateThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtController';

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtsById).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);

module.exports = router;