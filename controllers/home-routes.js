const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_text', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    }).then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
    }).catch(err => res.status(500).json(err));
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;