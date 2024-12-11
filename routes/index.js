// import all routes and package them up for export
const router = require('express').Router();
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;