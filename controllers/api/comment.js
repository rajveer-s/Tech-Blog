const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      attributes: ['id', 'comment_data', 'user_id', 'post_id'],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// GET comment by id
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk({
      attributes: ['id', 'comment_data', 'user_id', 'post_id'],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// CREATE a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_data: req.body.comment_data,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;