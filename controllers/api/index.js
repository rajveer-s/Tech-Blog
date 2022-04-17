const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postroutes');
const commentRoutes = require('./comment');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);



module.exports = router;
