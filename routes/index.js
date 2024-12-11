// import all routes and package them up for export
const router = require('express').Router();
import userRoutes from './api/userRoutes.js';
import thoughtRoutes from './api/thoughtRoutes.js';

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;