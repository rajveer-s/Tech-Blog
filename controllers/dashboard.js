const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: ["id", "name"],
      include: [
        {
          model: Post,
          attributes: ["id", "title", "content", "user_id", "date_created"],
        },
      ],
    });
    
    const posts = user.get({ plain: true });
    res.render("dashboard", {
      ...posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/makeanewpost', (req, res) => {
  res.render('makeapost', {
    logged_in: req.session.logged_in
  });
});


router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment_data', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['name']
          }
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('editpost', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
